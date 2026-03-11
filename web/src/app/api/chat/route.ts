import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createHmac, createHash, timingSafeEqual } from 'crypto'

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

const MAX_REQUESTS = 5
const WINDOW_SEC = 60 * 60 // 1 Stunde
const COOKIE_NAME = 'chat_rl'
const RL_SECRET = process.env.RATE_LIMIT_SECRET || 'dev-secret-change-me'

const SYSTEM_PROMPT = `
Du bist ein hilfreicher Assistent, der ausschließlich beim Üben und Verbessern von Prompts hilft.
Beantworte keine themenfremden Fragen und antworte auf Deutsch.
`

type RLState = {
	used: number
	resetAt: number
	fingerprint: string
}

function sign(payload: string) {
	return createHmac('sha256', RL_SECRET).update(payload).digest('hex')
}

function hash(input: string) {
	return createHash('sha256').update(input).digest('hex')
}

function getFingerprint(req: NextRequest) {
	const ip =
		req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
	const ua = req.headers.get('user-agent') || 'unknown'
	return hash(`${ip}|${ua}`)
}

function encodeState(state: RLState) {
	const payload = Buffer.from(JSON.stringify(state)).toString('base64url')
	return `${payload}.${sign(payload)}`
}

function decodeState(raw?: string): RLState | null {
	if (!raw) return null
	const [payload, sig] = raw.split('.')
	if (!payload || !sig) return null

	const expected = sign(payload)
	const a = Buffer.from(sig)
	const b = Buffer.from(expected)
	if (a.length !== b.length || !timingSafeEqual(a, b)) return null

	try {
		const parsed = JSON.parse(
			Buffer.from(payload, 'base64url').toString(),
		) as RLState
		if (
			typeof parsed.used !== 'number' ||
			typeof parsed.resetAt !== 'number' ||
			typeof parsed.fingerprint !== 'string'
		) {
			return null
		}
		return parsed
	} catch {
		return null
	}
}

export async function POST(req: NextRequest) {
	const now = Date.now()
	const currentFp = getFingerprint(req)
	const raw = req.cookies.get(COOKIE_NAME)?.value
	let state = decodeState(raw)

	if (!state || now > state.resetAt) {
		state = {
			used: 0,
			resetAt: now + WINDOW_SEC * 1000,
			fingerprint: currentFp,
		}
	}

	// Zusätzliche Restriktion: Cookie darf nur vom gleichen Fingerprint genutzt werden
	if (state.fingerprint !== currentFp) {
		const res = NextResponse.json(
			{
				error: 'Session ungültig. Bitte später erneut versuchen.',
				remaining: 0,
			},
			{ status: 429 },
		)
		res.cookies.set(COOKIE_NAME, encodeState(state), {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: WINDOW_SEC,
		})
		return res
	}

	if (state.used >= MAX_REQUESTS) {
		const res = NextResponse.json(
			{
				error: `Limit erreicht (${MAX_REQUESTS} Anfragen pro Stunde).`,
				remaining: 0,
			},
			{ status: 429 },
		)
		res.cookies.set(COOKIE_NAME, encodeState(state), {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: WINDOW_SEC,
		})
		return res
	}

	const { messages } = await req.json()
	if (!messages || !Array.isArray(messages)) {
		return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
	}

	const completion = await client.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{ role: 'system', content: SYSTEM_PROMPT },
			...messages.slice(-10),
		],
		max_tokens: 500,
		temperature: 0,
	})

	state.used += 1
	const remaining = Math.max(0, MAX_REQUESTS - state.used)
	const reply =
		completion.choices[0]?.message?.content ?? 'Keine Antwort erhalten.'

	const res = NextResponse.json({ reply, remaining })
	res.cookies.set(COOKIE_NAME, encodeState(state), {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: WINDOW_SEC,
	})

	return res
}
