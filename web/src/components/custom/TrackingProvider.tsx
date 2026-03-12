'use client'

import { useState } from 'react'
import { CookieBanner } from './CookieBanner'

export function TrackingProvider({
	children,
	matomoScript,
}: {
	children: React.ReactNode
	matomoScript: React.ReactNode
}) {
	const [trackingAllowed, setTrackingAllowed] = useState(false)

	return (
		<>
			{trackingAllowed && matomoScript}
			<CookieBanner
				onAccept={() => setTrackingAllowed(true)}
				onDecline={() => setTrackingAllowed(false)}
			/>
			{children}
		</>
	)
}
