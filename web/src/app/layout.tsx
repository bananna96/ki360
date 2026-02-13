import type { Metadata } from 'next'
import './globals.css'
import { outward, satoshi } from '@/lib/fonts'
import Nav from '@/components/custom/Nav'

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
			lang='en'
			className={`${satoshi.variable} ${outward.variable}`}
		>
			<body className='antialiased'>
				<header className='border-b'>
					<Nav links={[{ name: 'Grundlagen', href: '/grundlagen' }]} />
				</header>
				<main>{children}</main>
			</body>
		</html>
	)
}
