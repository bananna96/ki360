import type { Metadata } from 'next'
import './globals.css'
import { outward, satoshi } from '@/lib/fonts'
import Nav from '@/components/custom/nav/Nav'
import Footer from '@/components/custom/nav/Footer'

export const metadata: Metadata = {
	title: 'ki360 - KI verständlich erklärt',
	description:
		'Künstliche Intelligenz verständlich erklärt: Formen, Anwendungsgebiete und gesellschaftliche Auswirkungen.',
	keywords: ['KI', 'Künstliche Intelligenz', 'AI', 'Bildung'],
	authors: [{ name: 'Anna Laves' }],
	creator: 'Anna Laves',
	publisher: 'ki360',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='de'
			className={`${satoshi.variable} ${outward.variable} `}
		>
			<body className='antialiased min-h-screen'>
				<header>
					<Nav />
				</header>
				<main className='pt-(--height-nav)'>{children}</main>
				<footer>
					<Footer />
				</footer>
			</body>
		</html>
	)
}
