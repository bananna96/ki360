import type { Metadata } from 'next'
import './globals.css'
import { outward, satoshi } from '@/lib/fonts'
import Script from 'next/script'
import { MatomoPageView } from '@/components/custom/MatomoPageView'
import Nav from '@/components/custom/nav/Nav'
import Footer from '@/components/custom/nav/Footer'
import { TrackingProvider } from '@/components/custom/TrackingProvider'

export const metadata: Metadata = {
	title: 'ki360',
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
	),
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const matomoUrl = process.env.NEXT_PUBLIC_MATOMO_URL
	const matomoSiteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID
	const base = matomoUrl?.endsWith('/') ? matomoUrl : `${matomoUrl}/`
	const isProduction = process.env.NODE_ENV === 'production'
	const trackMatomo = isProduction && !!matomoUrl && !!matomoSiteId

	const matomoScript = trackMatomo ? (
		<>
			<Script
				id='matomo-init'
				strategy='afterInteractive'
			>
				{`
          var _paq = window._paq = window._paq || [];
          _paq.push(['disableCookies']);
          _paq.push(['setDoNotTrack', true]);
          _paq.push(['setTrackerUrl', '${base}matomo.php']);
          _paq.push(['setSiteId', '${matomoSiteId}']);
          (function() {
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src='${base}matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        `}
			</Script>
			<MatomoPageView />
		</>
	) : null

	return (
		<html
			lang='de'
			className={`${satoshi.variable} ${outward.variable}`}
		>
			<body className='antialiased min-h-screen'>
				<TrackingProvider matomoScript={matomoScript}>
					{/* {!isProduction && ( */}
					<header>
						<Nav />
					</header>
					{/* )} */}

					{/* <main className={isProduction ? '' : 'pt-[var(--height-nav)]'}> */}
					<main className='pt-[var(--height-nav)]'>{children}</main>

					{/* {!isProduction && <Footer />} */}
					<Footer />
				</TrackingProvider>
			</body>
		</html>
	)
}
