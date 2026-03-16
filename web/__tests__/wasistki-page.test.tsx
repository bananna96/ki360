import React from 'react'
import { render, screen } from '@testing-library/react'
import WasIstKiPage from '@/app/wasistki/page'
import { client } from '@/lib/sanity/client'

jest.mock('@/lib/sanity/client', () => ({
	client: {
		fetch: jest.fn(),
	},
}))

jest.mock('next/link', () => {
	return function MockLink({
		href,
		children,
		...props
	}: React.PropsWithChildren<{ href: string }>) {
		return (
			<a
				href={href}
				{...props}
			>
				{children}
			</a>
		)
	}
})

jest.mock('@/components/SanityImage', () => ({
	SanityImage: (props: { src: string; alt: string }) => (
		<img
			alt={props.alt}
			src={props.src}
		/>
	),
}))

jest.mock('@/components/custom/ConsentVideo', () => ({
	ConsentVideo: ({ title }: { title: string }) => <div>{title}</div>,
}))

jest.mock('@/components/custom/ReadBtn', () => ({
	ReadButton: ({ text }: { text: string }) => <button>{text}</button>,
}))

jest.mock('@/components/ui/button', () => ({
	Button: ({
		children,
		...props
	}: React.PropsWithChildren<
		React.ButtonHTMLAttributes<HTMLButtonElement>
	>) => <button {...props}>{children}</button>,
	IconButton: ({ ariaLabel }: { ariaLabel: string }) => (
		<button aria-label={ariaLabel}>x</button>
	),
}))

jest.mock('@/components/ui/drawer', () => ({
	Drawer: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
	DrawerTrigger: ({ children }: React.PropsWithChildren) => (
		<div>{children}</div>
	),
	DrawerContent: ({ children }: React.PropsWithChildren) => (
		<section>{children}</section>
	),
	DrawerHeader: ({ children }: React.PropsWithChildren) => (
		<header>{children}</header>
	),
	DrawerTitle: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
	DrawerDescription: ({ children }: React.PropsWithChildren) => (
		<p>{children}</p>
	),
	DrawerClose: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
}))

const makeImage = (alt: string, suffix: string) => ({
	alt,
	asset: {
		_id: `img-${suffix}`,
		url: `https://cdn.sanity.io/images/project/${suffix}.jpg`,
		metadata: {
			lqip: 'data:image/png;base64,abc',
			dimensions: { width: 1200, height: 800, aspectRatio: 1.5 },
		},
	},
})

describe('Was ist KI page', () => {
	it('renders all key sections and interactive cards from Sanity content', async () => {
		const fetchMock = client.fetch as jest.Mock
		fetchMock.mockResolvedValue({
			section1: {
				title: 'Was ist KI?',
				description: 'Ein Überblick über die Grundlagen',
				image: makeImage('Titelbild', 'hero'),
			},
			section2: { text: 'Video Intro', url: 'https://youtu.be/demo' },
			section3: {
				title: 'Anwendungsfelder',
				items: [
					{
						itemTitle: 'Bildanalyse',
						subtitle: 'Objekte erkennen',
						link: { text: 'Mehr', url: '/foo' },
						image: makeImage('Bildanalyse Icon', 's3-1'),
					},
				],
			},
			section4: {
				title: 'Risiken und Chancen',
				backgroundImage: makeImage('Hintergrund', 'bg'),
				blocks: [
					{
						title: 'Chancen',
						description: 'Effizienzgewinne durch Automatisierung',
						items: ['Schneller', 'Skalierbar'],
					},
				],
			},
			section5: {
				title: 'Technische Methodiken',
				items: [
					{
						itemTitle: 'Direktlink Karte',
						subtitle: 'Weiter zur Detailseite',
						link: '/wasistki/technischemethodiken',
						image: makeImage('Direktlink Bild', 's5-1'),
					},
					{
						itemTitle: 'Drawer Karte',
						subtitle: 'Mehr Informationen im Drawer',
						link: '/unused',
						image: makeImage('Drawer Bild', 's5-2'),
					},
				],
				overlayText: [
					{
						title: 'Drawer Titel',
						items: [
							{
								itemTitle: 'Teil 1',
								subtitle: 'Erklärung 1',
								link: { text: 'Mehr', url: '/bar' },
								image: makeImage('Overlay Bild', 'ov-1'),
							},
						],
					},
				],
			},
		})

		const ui = await WasIstKiPage()
		render(ui as React.ReactElement)

		expect(
			screen.getByRole('heading', { level: 4, name: 'Was ist KI?' }),
		).toBeInTheDocument()
		expect(screen.getByText('Video Intro')).toBeInTheDocument()
		expect(
			screen.getByRole('heading', { level: 3, name: 'Anwendungsfelder' }),
		).toBeInTheDocument()
		expect(
			screen.getByRole('heading', { level: 3, name: 'Technische Methodiken' }),
		).toBeInTheDocument()
		expect(
			screen.getByRole('link', { name: 'Direktlink Karte' }),
		).toHaveAttribute('href', '/wasistki/technischemethodiken')
		expect(
			screen.getByRole('heading', { level: 3, name: 'Drawer Titel' }),
		).toBeInTheDocument()
		expect(
			screen.getByRole('button', { name: 'Schließen' }),
		).toBeInTheDocument()
	})
})
