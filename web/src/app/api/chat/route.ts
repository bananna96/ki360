import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createHash, createHmac, timingSafeEqual } from 'crypto'
import { client as sanityClient } from '@/lib/sanity/client'
import { promptingQuery } from '@/lib/sanity/queries'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const MAX_REQUESTS = 5
const WINDOW_SEC = 3600
const COOKIE_NAME = 'chat_rl'
const SECRET = process.env.RATE_LIMIT_SECRET || 'dev-secret-change-me'

const SYSTEM = `Du bist ein Prompt-Coach. Du hilfst ausschliesslich beim Ueben und Verbessern von Prompts.
Antworte immer auf Deutsch.
Nutze die Prompting-Tipps dieser Website aktiv als Bewertungsrahmen.
Ordne jede Nutzereingabe dem passendsten Tipp zu oder benenne klar, wenn mehrere Tipps relevant sind.
Begruende deine Verbesserungsvorschlaege mit Bezug auf diese Tipps statt nur allgemein zu antworten.
Wenn ein Uebungsfall gesendet wird, gib die Antwort in dieser Struktur:
1) Passender Tipp
2) Kurzes Feedback
3) Verbesserungen
4) Verbesserter Prompt
5) Testidee
Wenn die Nutzereingabe zu unklar ist, stelle maximal 2 gezielte Rueckfragen statt zu raten.
Keine themenfremden Antworten.`

const TXT = {
	blocked:
		'Dieser Uebungschat ist nur fuer sichere Prompt-Uebungen gedacht. Themen wie Sex, Gewalt, Beleidigungen, Hass oder Selbstverletzung sind ausgeschlossen.',
	tipsDown:
		'Die Prompting-Tipps der Website konnten gerade nicht geladen werden. Bitte versuche es spaeter erneut.',
	badReq: 'Ungueltige Anfrage.',
	badMsgs: 'Keine gueltigen Nachrichten.',
	badSession: 'Session ungueltig. Bitte spaeter erneut versuchen.',
	limit: `Limit erreicht (${MAX_REQUESTS} Anfragen pro Stunde).`,
} as const

type Msg = { role: 'user' | 'assistant'; content: string }
type Practice = {
	tipTitle?: string | null
	goal?: string
	context?: string
	prompt?: string
}
type Tip = {
	tip: { title: string; description: string }
	bullets: string[]
	example: string
}
type Rate = { used: number; resetAt: number; fingerprint: string }

let cache: Tip[] | null = null
const words = [
	...`sex sexual sexuell porno pornografie pornograph erotik erotisch nackt nacktheit nude gewalt gewalttat gewaltfantasie gewaltverherrlichung toten toeten toete umbringen erstechen erschiessen mord kill murder krieg kriege terror terrorismus terroranschlag bombe bomben bombenanschlag waffe waffen waffengewalt angriff attentat folter hinrichtung massaker weapon weapons bomb war warfare massacre torture execution beleidig beschimpf hass hassrede rassist diskriminier nazi selbstmord suizid selbstverletz ritzen`.split(
		' ',
	),
	'hate speech',
	'self harm',
]

const norm = (s: string) =>
	s
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/ß/g, 'ss')
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
const toks = (s: string) =>
	norm(s)
		.split(' ')
		.filter((x) => x.length >= 4)
const blocked = words.map(norm).filter((x) => x.length >= 4)
const hash = (s: string) => createHash('sha256').update(s).digest('hex')
const sign = (s: string) => createHmac('sha256', SECRET).update(s).digest('hex')
const fail = (error: string, status: number) =>
	NextResponse.json({ error }, { status })
const vals = (p?: Practice) =>
	[p?.tipTitle || '', p?.goal || '', p?.context || '', p?.prompt || ''].filter(
		Boolean,
	)

const fingerprint = (req: NextRequest) => {
	const ip =
		req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
	const ua = req.headers.get('user-agent') || 'unknown'
	return hash(`${ip}|${ua}`)
}

const encode = (r: Rate) => {
	const p = Buffer.from(JSON.stringify(r)).toString('base64url')
	return `${p}.${sign(p)}`
}

const decode = (raw?: string): Rate | null => {
	if (!raw) return null
	const [p, sig] = raw.split('.')
	if (!p || !sig) return null
	const a = Buffer.from(sig),
		b = Buffer.from(sign(p))
	if (a.length !== b.length || !timingSafeEqual(a, b)) return null
	try {
		const data = JSON.parse(
			Buffer.from(p, 'base64url').toString(),
		) as Partial<Rate>
		if (
			typeof data.used !== 'number' ||
			typeof data.resetAt !== 'number' ||
			typeof data.fingerprint !== 'string'
		)
			return null
		return data as Rate
	} catch {
		return null
	}
}

const withCookie = (res: NextResponse, r: Rate) => {
	res.cookies.set(COOKIE_NAME, encode(r), {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: WINDOW_SEC,
	})
	return res
}

const isMsg = (v: unknown): v is Msg => {
	if (!v || typeof v !== 'object') return false
	const x = v as Record<string, unknown>
	return (
		(x.role === 'user' || x.role === 'assistant') &&
		typeof x.content === 'string' &&
		!!x.content.trim()
	)
}

const lev = (a: string, b: string) => {
	if (a === b) return 0
	if (!a.length) return b.length
	if (!b.length) return a.length
	const row = Array.from({ length: b.length + 1 }, (_, i) => i)
	for (let i = 0; i < a.length; i++) {
		let d = row[0]
		row[0] = i + 1
		for (let j = 0; j < b.length; j++) {
			const t = row[j + 1],
				c = a[i] === b[j] ? 0 : 1
			row[j + 1] = Math.min(row[j + 1] + 1, row[j] + 1, d + c)
			d = t
		}
	}
	return row[b.length]
}

const hasBlocked = (input: string) => {
	const n = norm(input)
	if (blocked.some((w) => n.includes(w))) return true
	const ws = toks(n)
	return blocked.some((b) =>
		ws.some(
			(w) =>
				w === b ||
				w.includes(b) ||
				b.includes(w) ||
				(Math.abs(w.length - b.length) <= 1 && lev(w, b) <= 1),
		),
	)
}

const practiceCtx = (p?: Practice) => {
	if (!p?.prompt?.trim()) return null
	return [
		'Aktueller Uebungsfall:',
		p.goal?.trim()
			? `- Uebungsziel: ${p.goal.trim()}`
			: '- Uebungsziel: (nicht angegeben)',
		p.tipTitle?.trim() ? `- Ausgewaehlter Tipp: ${p.tipTitle.trim()}` : '',
		p.context?.trim() ? `- Kontext: ${p.context.trim()}` : '',
		`- Zu verbessernder Prompt: ${p.prompt.trim()}`,
		'Nutze diese Angaben explizit in deinem Feedback.',
	]
		.filter(Boolean)
		.join('\n')
}

const score = (tip: Tip, p?: Practice) => {
	const selected = norm(p?.tipTitle || ''),
		title = norm(tip.tip.title)
	const text = norm(
		[
			tip.tip.title,
			tip.tip.description,
			tip.bullets.join(' '),
			tip.example,
		].join(' '),
	)
	let pts = !selected
		? 0
		: title === selected
			? 100
			: title.includes(selected) || selected.includes(title)
				? 70
				: 0
	for (const t of toks(vals(p).join(' '))) if (text.includes(t)) pts += 8
	return pts
}

const tipsCtx = async (p?: Practice) => {
	let slides: Tip[] = []
	try {
		const content = await sanityClient.fetch<{ slides?: Tip[] }>(promptingQuery)
		slides = content?.slides ?? []
		if (slides.length) cache = slides
	} catch {
		slides = cache ?? []
	}
	if (!slides.length) throw new Error('PROMPTING_TIPS_UNAVAILABLE')

	const ranked = slides
		.map((s) => ({ s, pts: score(s, p) }))
		.sort((a, b) => b.pts - a.pts)
	const top = ranked[0]?.pts ?? 0
	const main =
		top > 0
			? ranked.filter((x) => x.pts === top).map((x) => x.s)
			: ranked.slice(0, Math.min(3, ranked.length)).map((x) => x.s)
	const rest = slides.filter(
		(s) => !main.some((m) => m.tip.title === s.tip.title),
	)

	return [
		'Diese Prompting-Tipps stammen direkt von der Webseite und muessen als Uebungsrahmen verwendet werden.',
		'Primaer relevante Tipps fuer diesen Uebungsfall:',
		...main.map(
			(s, i) =>
				`${i + 1}. ${s.tip.title}: ${s.tip.description}${s.bullets?.length ? ` KERNAUSSAGEN: ${s.bullets.join(' | ')}` : ''}${s.example ? ` BEISPIEL: ${s.example}` : ''}`,
		),
		rest.length
			? `Weitere verfuegbare Tipps: ${rest.map((s) => s.tip.title).join(' | ')}`
			: '',
		'Waehle in deiner Antwort einen primaeren Tipp, nenne ihn unter "Passender Tipp" und begruende die Wahl am konkreten Prompt des Nutzers.',
	]
		.filter(Boolean)
		.join('\n')
}

export async function POST(req: NextRequest) {
	const now = Date.now(),
		fp = fingerprint(req)
	let rate = decode(req.cookies.get(COOKIE_NAME)?.value)
	if (!rate || now > rate.resetAt)
		rate = { used: 0, resetAt: now + WINDOW_SEC * 1000, fingerprint: fp }
	if (rate.fingerprint !== fp)
		return withCookie(
			NextResponse.json(
				{ error: TXT.badSession, remaining: 0 },
				{ status: 429 },
			),
			rate,
		)
	if (rate.used >= MAX_REQUESTS)
		return withCookie(
			NextResponse.json({ error: TXT.limit, remaining: 0 }, { status: 429 }),
			rate,
		)

	const body = (await req.json()) as { messages?: unknown; practice?: Practice }
	if (!body.messages || !Array.isArray(body.messages))
		return fail(TXT.badReq, 400)

	const msgs = body.messages.filter(isMsg)
	if (!msgs.length) return fail(TXT.badMsgs, 400)

	const latestUser =
		[...msgs].filter((m) => m.role === 'user').pop()?.content || ''
	if (hasBlocked([latestUser, ...vals(body.practice)].join('\n')))
		return fail(TXT.blocked, 400)

	let tips = ''
	try {
		tips = await tipsCtx(body.practice)
	} catch {
		return fail(TXT.tipsDown, 503)
	}
	const pctx = practiceCtx(body.practice)

	const completion = await openai.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{ role: 'system', content: SYSTEM },
			...(tips ? [{ role: 'system' as const, content: tips }] : []),
			...(pctx ? [{ role: 'system' as const, content: pctx }] : []),
			...msgs
				.filter((m) => m.role !== 'user' || !hasBlocked(m.content))
				.slice(-10),
		],
		max_tokens: 500,
		temperature: 0,
	})

	rate.used += 1
	const remaining = Math.max(0, MAX_REQUESTS - rate.used)
	const reply =
		completion.choices[0]?.message?.content ?? 'Keine Antwort erhalten.'
	return withCookie(NextResponse.json({ reply, remaining }), rate)
}
