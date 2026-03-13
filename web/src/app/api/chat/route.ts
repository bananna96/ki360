import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createHmac, createHash, timingSafeEqual } from 'crypto'
import { client as sanityClient } from '@/lib/sanity/client'
import { promptingQuery } from '@/lib/sanity/queries'

const openAiClient = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

const MAX_REQUESTS = 5
const WINDOW_SEC = 60 * 60 // 1 Stunde
const COOKIE_NAME = 'chat_rl'
const RL_SECRET = process.env.RATE_LIMIT_SECRET || 'dev-secret-change-me'

const SYSTEM_PROMPT = `
Du bist ein Prompt-Coach. Du hilfst ausschliesslich beim Ueben und Verbessern von Prompts.
Antworte immer auf Deutsch.

Nutze die Prompting-Tipps dieser Website aktiv als Bewertungsrahmen.
Ordne jede Nutzereingabe dem passendsten Tipp zu oder benenne klar, wenn mehrere Tipps relevant sind.
Begruende deine Verbesserungsvorschlaege mit Bezug auf diese Tipps statt nur allgemein zu antworten.

Wenn ein Uebungsfall gesendet wird, gib die Antwort in dieser Struktur:
1) Passender Tipp: Nenne zuerst den wichtigsten Website-Tipp und begruende die Auswahl kurz
2) Kurzes Feedback: Was am Prompt schon gut ist (1-2 Punkte)
3) Verbesserungen: 3 konkrete, umsetzbare Aenderungen
4) Verbesserter Prompt: direkt kopierbar als Block
5) Testidee: 1 kurzer Test-Input, mit dem der Nutzer pruefen kann, ob der Prompt besser ist

Wenn die Nutzereingabe zu unklar ist, stelle maximal 2 gezielte Rueckfragen statt zu raten.
Keine themenfremden Antworten.
`

type ApiMessage = {
	role: 'user' | 'assistant'
	content: string
}

type PracticePayload = {
	tipTitle?: string | null
	goal?: string
	context?: string
	prompt?: string
}

type PromptingTip = {
	tip: {
		title: string
		description: string
	}
	bullets: string[]
	example: string
}

type PromptingContent = {
	slides?: PromptingTip[]
}

type RLState = {
	used: number
	resetAt: number
	fingerprint: string
}

const BLOCKED_TOPIC_TERMS = {
	sexual: [
		'sex',
		'sexual',
		'sexuell',
		'porno',
		'pornografie',
		'pornograph',
		'erotik',
		'erotisch',
		'nackt',
		'nacktheit',
		'nude',
	],
	violence: [
		'gewalt',
		'gewalttat',
		'gewaltfantasie',
		'gewaltverherrlichung',
		'toten',
		'toeten',
		'toete',
		'umbringen',
		'erstechen',
		'erschiessen',
		'mord',
		'kill',
		'murder',
		'krieg',
		'kriege',
		'terror',
		'terrorismus',
		'terroranschlag',
		'bombe',
		'bomben',
		'bombenanschlag',
		'waffe',
		'waffen',
		'waffengewalt',
		'angriff',
		'attentat',
		'folter',
		'hinrichtung',
		'massaker',
		'weapon',
		'weapons',
		'bomb',
		'war',
		'warfare',
		'massacre',
		'torture',
		'execution',
	],
	harassment: [
		'beleidig',
		'beschimpf',
		'hass',
		'hassrede',
		'hate speech',
		'rassist',
		'diskriminier',
		'nazi',
	],
	selfHarm: ['selbstmord', 'suizid', 'selbstverletz', 'ritzen', 'self harm'],
} as const

const BLOCKED_TOPICS_MESSAGE =
	'Dieser Uebungschat ist nur fuer sichere Prompt-Uebungen gedacht. Themen wie Sex, Gewalt, Beleidigungen, Hass oder Selbstverletzung sind ausgeschlossen.'

const TIPS_UNAVAILABLE_MESSAGE =
	'Die Prompting-Tipps der Website konnten gerade nicht geladen werden. Bitte versuche es spaeter erneut.'

let cachedPromptingTips: PromptingTip[] | null = null

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

function isValidApiMessage(value: unknown): value is ApiMessage {
	if (!value || typeof value !== 'object') return false
	const candidate = value as Record<string, unknown>
	const role = candidate.role
	const content = candidate.content
	return (
		(role === 'user' || role === 'assistant') &&
		typeof content === 'string' &&
		content.trim().length > 0
	)
}

function normalizeText(input: string) {
	return input
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/ß/g, 'ss')
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}

function tokenize(input: string) {
	return normalizeText(input)
		.split(' ')
		.filter((token) => token.length >= 4)
}

function levenshteinDistance(left: string, right: string): number {
	if (left === right) return 0
	if (!left.length) return right.length
	if (!right.length) return left.length
	const previousRow = Array.from(
		{ length: right.length + 1 },
		(_, index) => index,
	)
	for (let leftIndex = 0; leftIndex < left.length; leftIndex += 1) {
		let diagonal = previousRow[0]
		previousRow[0] = leftIndex + 1
		for (let rightIndex = 0; rightIndex < right.length; rightIndex += 1) {
			const temp = previousRow[rightIndex + 1]
			const cost = left[leftIndex] === right[rightIndex] ? 0 : 1
			previousRow[rightIndex + 1] = Math.min(
				previousRow[rightIndex + 1] + 1,
				previousRow[rightIndex] + 1,
				diagonal + cost,
			)
			diagonal = temp
		}
	}
	return previousRow[right.length]
}

function hasFuzzyBlockedTermMatch(normalizedInput: string) {
	const inputTokens = tokenize(normalizedInput)
	const blockedTerms = Object.values(BLOCKED_TOPIC_TERMS)
		.flat()
		.map((term) => normalizeText(term))
		.filter((term) => term.length >= 4)
	return blockedTerms.some((blockedTerm) =>
		inputTokens.some((token) => {
			if (token === blockedTerm) return true
			if (token.includes(blockedTerm) || blockedTerm.includes(token))
				return true
			if (Math.abs(token.length - blockedTerm.length) > 1) return false
			return levenshteinDistance(token, blockedTerm) <= 1
		}),
	)
}

function buildPracticeContext(practice?: PracticePayload) {
	if (!practice) return null

	const prompt = practice.prompt?.trim() || ''
	const goal = practice.goal?.trim() || ''
	const context = practice.context?.trim() || ''
	const tipTitle = practice.tipTitle?.trim() || ''

	if (!prompt) return null

	return [
		'Aktueller Uebungsfall:',
		goal ? `- Uebungsziel: ${goal}` : '- Uebungsziel: (nicht angegeben)',
		tipTitle ? `- Ausgewaehlter Tipp: ${tipTitle}` : '',
		context ? `- Kontext: ${context}` : '',
		`- Zu verbessernder Prompt: ${prompt}`,
		'Nutze diese Angaben explizit in deinem Feedback.',
	]
		.filter(Boolean)
		.join('\n')
}

function containsBlockedTopics(input: string) {
	const normalizedInput = normalizeText(input)

	if (
		Object.values(BLOCKED_TOPIC_TERMS).some((terms) =>
			terms.some((term) => normalizedInput.includes(normalizeText(term))),
		)
	) {
		return true
	}

	return hasFuzzyBlockedTermMatch(normalizedInput)
}

function buildSafetyCheckText(
	messages: ApiMessage[],
	practice?: PracticePayload,
) {
	const latestUserMessage = [...messages]
		.filter((message) => message.role === 'user')
		.pop()

	return [
		latestUserMessage?.content || '',
		practice?.tipTitle || '',
		practice?.goal || '',
		practice?.context || '',
		practice?.prompt || '',
	]
		.filter(Boolean)
		.join('\n')
}

function buildTipSearchText(practice?: PracticePayload) {
	return [
		practice?.tipTitle || '',
		practice?.goal || '',
		practice?.context || '',
		practice?.prompt || '',
	]
		.filter(Boolean)
		.join(' ')
}

function scoreTipMatch(slide: PromptingTip, practice?: PracticePayload) {
	const selectedTitle = normalizeText(practice?.tipTitle || '')
	const slideTitle = normalizeText(slide.tip.title)
	const slideContent = normalizeText(
		[
			slide.tip.title,
			slide.tip.description,
			slide.bullets.join(' '),
			slide.example,
		].join(' '),
	)
	const searchTokens = tokenize(buildTipSearchText(practice))

	let score = 0

	if (selectedTitle) {
		if (slideTitle === selectedTitle) score += 100
		else if (
			slideTitle.includes(selectedTitle) ||
			selectedTitle.includes(slideTitle)
		) {
			score += 70
		}
	}

	for (const token of searchTokens) {
		if (slideContent.includes(token)) score += 8
	}

	return score
}

async function getPromptingTips() {
	try {
		const content = await sanityClient.fetch<PromptingContent>(promptingQuery)
		const slides = content?.slides ?? []

		if (slides.length > 0) {
			cachedPromptingTips = slides
			return slides
		}
	} catch {
		if (cachedPromptingTips?.length) return cachedPromptingTips
	}

	if (cachedPromptingTips?.length) return cachedPromptingTips

	throw new Error('PROMPTING_TIPS_UNAVAILABLE')
}

async function buildTipsContext(practice?: PracticePayload) {
	const slides = await getPromptingTips()
	const rankedSlides = [...slides]
		.map((slide) => ({ slide, score: scoreTipMatch(slide, practice) }))
		.sort((left, right) => right.score - left.score)

	const topScore = rankedSlides[0]?.score ?? 0
	const prioritizedSlides =
		topScore > 0
			? rankedSlides
					.filter((entry) => entry.score === topScore)
					.map((entry) => entry.slide)
			: rankedSlides
					.slice(0, Math.min(3, rankedSlides.length))
					.map((entry) => entry.slide)

	const otherSlides = slides.filter(
		(slide) =>
			!prioritizedSlides.some((entry) => entry.tip.title === slide.tip.title),
	)

	return [
		'Diese Prompting-Tipps stammen direkt von der Website und muessen als Uebungsrahmen verwendet werden.',
		'Primaer relevante Tipps fuer diesen Uebungsfall:',
		...prioritizedSlides.map((slide, index) => {
			const bullets = slide.bullets?.length
				? ` KERNAUSSAGEN: ${slide.bullets.join(' | ')}`
				: ''
			const example = slide.example ? ` BEISPIEL: ${slide.example}` : ''

			return `${index + 1}. ${slide.tip.title}: ${slide.tip.description}${bullets}${example}`
		}),
		otherSlides.length
			? `Weitere verfuegbare Tipps: ${otherSlides.map((slide) => slide.tip.title).join(' | ')}`
			: '',
		'Waehle in deiner Antwort einen primaeren Tipp, nenne ihn unter "Passender Tipp" und begruende die Wahl am konkreten Prompt des Nutzers.',
	]
		.filter(Boolean)
		.join('\n')
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

	const body = await req.json()
	const { messages, practice } = body as {
		messages?: unknown
		practice?: PracticePayload
	}

	if (!messages || !Array.isArray(messages)) {
		return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
	}

	const validMessages = messages.filter(isValidApiMessage)
	if (!validMessages.length) {
		return NextResponse.json(
			{ error: 'Keine gueltigen Nachrichten.' },
			{ status: 400 },
		)
	}

	const safetyCheckText = buildSafetyCheckText(validMessages, practice)
	if (containsBlockedTopics(safetyCheckText)) {
		return NextResponse.json({ error: BLOCKED_TOPICS_MESSAGE }, { status: 400 })
	}

	const practiceContext = buildPracticeContext(practice)

	let tipsContext: string
	try {
		tipsContext = await buildTipsContext(practice)
	} catch {
		return NextResponse.json(
			{ error: TIPS_UNAVAILABLE_MESSAGE },
			{ status: 503 },
		)
	}

	const completion = await openAiClient.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{ role: 'system', content: SYSTEM_PROMPT },
			...(tipsContext
				? [{ role: 'system' as const, content: tipsContext }]
				: []),
			...(practiceContext
				? [{ role: 'system' as const, content: practiceContext }]
				: []),
			...validMessages
				.filter(
					(msg) => msg.role !== 'user' || !containsBlockedTopics(msg.content),
				)
				.slice(-10),
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
