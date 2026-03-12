'use client'

import { useCookieConsent } from './CookieBanner'

export function CookieSettingsButton() {
	const { reset } = useCookieConsent()

	return (
		<button
			onClick={reset}
			aria-label='Cookie-Einstellungen ändern'
			className='fixed bottom-4 left-4 z-40 text-xs text-(--color-frost) bg-(--color-glossyBlack)/80 hover:bg-(--color-glossyBlack) px-3 py-2 rounded-full border border-(--color-granite) transition-colors backdrop-blur-sm'
		>
			Cookie-Einstellungen
		</button>
	)
}
