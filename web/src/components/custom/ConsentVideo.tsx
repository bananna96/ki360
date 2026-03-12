'use client'

import { useEffect, useState } from 'react'
import { useCookieConsent } from './CookieBanner'

const COOKIE_KEY = 'cookie_consent'
const CONSENT_CHANGED_EVENT = 'cookie-consent-changed'

export function ConsentVideo({
	src,
	title,
	className,
}: {
	src: string
	title: string
	className?: string
}) {
	const [allowed, setAllowed] = useState(false)
	const { openPreferences } = useCookieConsent()

	useEffect(() => {
		setAllowed(localStorage.getItem(COOKIE_KEY) === 'accepted')

		function handleStorage(e: StorageEvent) {
			if (e.key === COOKIE_KEY) setAllowed(e.newValue === 'accepted')
		}

		function handleConsentChanged(e: Event) {
			const consent = (e as CustomEvent<{ consent?: string }>).detail?.consent
			setAllowed(consent === 'accepted')
		}

		window.addEventListener('storage', handleStorage)
		window.addEventListener(CONSENT_CHANGED_EVENT, handleConsentChanged)

		return () => {
			window.removeEventListener('storage', handleStorage)
			window.removeEventListener(CONSENT_CHANGED_EVENT, handleConsentChanged)
		}
	}, [])

	if (!allowed) {
		return (
			<div
				className={`${className} bg-(--color-granite) flex flex-col items-center justify-center gap-4 text-(--color-frost) px-4 text-center`}
			>
				<p className='text-sm md:text-base max-w-md'>
					Dieses Video wird von einem externen Anbieter bereitgestellt. Bitte
					akzeptiere die Cookies, um das Video zu sehen.
				</p>
				<button
					onClick={openPreferences}
					className='text-sm px-4 py-2 rounded border border-(--color-frost) hover:bg-(--color-glossyBlack) transition-colors'
				>
					Cookie-Einstellungen öffnen
				</button>
			</div>
		)
	}

	return (
		<iframe
			src={src}
			title={title}
			loading='lazy'
			allowFullScreen
			className={className}
		/>
	)
}
