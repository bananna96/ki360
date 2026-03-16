'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const COOKIE_KEY = 'cookie_consent'
const OPEN_EVENT = 'open-cookie-banner'
const CONSENT_CHANGED_EVENT = 'cookie-consent-changed'

export function useCookieConsent() {
	function reset() {
		localStorage.removeItem(COOKIE_KEY)
		window.location.reload()
	}

	function openPreferences() {
		window.dispatchEvent(new Event(OPEN_EVENT))
	}

	return { reset, openPreferences }
}

export function CookieBanner({
	onAccept,
	onDecline,
}: {
	onAccept: () => void
	onDecline: () => void
}) {
	const [visible, setVisible] = useState(() => {
		if (typeof window === 'undefined') return false
		return !localStorage.getItem(COOKIE_KEY)
	})

	useEffect(() => {
		const consent = localStorage.getItem(COOKIE_KEY)
		if (consent === 'accepted') onAccept()

		function handleOpen() {
			setVisible(true)
		}

		window.addEventListener(OPEN_EVENT, handleOpen)
		return () => window.removeEventListener(OPEN_EVENT, handleOpen)
	}, [onAccept])

	function accept() {
		localStorage.setItem(COOKIE_KEY, 'accepted')
		window.dispatchEvent(
			new CustomEvent(CONSENT_CHANGED_EVENT, {
				detail: { consent: 'accepted' },
			}),
		)
		setVisible(false)
		onAccept()
	}

	function decline() {
		localStorage.setItem(COOKIE_KEY, 'declined')
		window.dispatchEvent(
			new CustomEvent(CONSENT_CHANGED_EVENT, {
				detail: { consent: 'declined' },
			}),
		)
		setVisible(false)
		onDecline()
	}

	if (!visible) return null

	return (
		<div
			role='dialog'
			aria-modal='true'
			aria-label='Cookie-Einstellungen'
			className='fixed bottom-0 left-0 right-0 z-50 bg-(--color-glossyBlack) text-(--color-frost) px-4 py-6 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'
		>
			<p className='text-sm md:text-base max-w-2xl'>
				Diese Website verwendet technisch notwendige Cookies (z.B. für den
				Chat), eingebettete Videos sowie Matomo zur anonymen Nutzungsanalyse.
				Bei eingebetteten Videos können Drittanbieter Daten verarbeiten.{' '}
				<Link
					href='/about/datenschutz'
					className='underline underline-offset-4 hover:text-(--color-skyBlue)'
				>
					Datenschutz
				</Link>
			</p>

			<div className='flex gap-4 shrink-0'>
				<Button
					type='button'
					variant='ghost'
					onClick={decline}
					className='h-auto rounded border border-(--color-frost) px-4 py-2 text-sm hover:bg-(--color-granite)'
				>
					Ablehnen
				</Button>
				<Button
					type='button'
					variant='ghost'
					onClick={accept}
					className='h-auto rounded bg-(--color-skyBlue) px-4 py-2 text-sm font-semibold text-(--color-glossyBlack) hover:bg-(--color-skyBlue) hover:opacity-80'
				>
					Akzeptieren
				</Button>
			</div>
		</div>
	)
}
