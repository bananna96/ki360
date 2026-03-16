import React from 'react'
import { render, screen } from '@testing-library/react'
import TechMethodsPage from '@/app/wasistki/technischemethodiken/page'
import { client } from '@/lib/sanity/client'

jest.mock('@/lib/sanity/client', () => ({
	client: {
		fetch: jest.fn(),
	},
}))

jest.mock('@/components/custom/Breadcrumbs', () => ({
	Breadcrumbs: () => <nav aria-label='breadcrumbs'>Breadcrumbs</nav>,
}))

jest.mock('@/components/custom/TechMethodDrawerCard', () => ({
	TechMethodDrawerCard: ({
		itemTitle,
		subtitle,
		link,
		imageSrc,
		imageAlt,
		colSpanClass,
	}: {
		itemTitle: string
		subtitle: string
		link: string
		imageSrc: string
		imageAlt: string
		colSpanClass: string
	}) => (
		<article data-colspan={colSpanClass}>
			<h2>{itemTitle}</h2>
			<p>{subtitle}</p>
			<a href={link}>Mehr</a>
			<div
				role='img'
				aria-label={imageAlt}
				data-src={imageSrc}
			/>
		</article>
	),
}))

describe('Technische Methodiken page', () => {
	it('renders heading and maps Sanity items into cards with optimized image urls', async () => {
		const fetchMock = client.fetch as jest.Mock
		fetchMock.mockResolvedValue({
			title: 'Technische Methodiken',
			items: [
				{
					itemTitle: 'Neuronale Netze',
					subtitle: 'Lernen durch Gewichtung',
					link: '/wasistki/technischemethodiken/netze',
					image: {
						asset: {
							_id: 'img-1',
							url: 'https://cdn.sanity.io/images/project/image-1.jpg',
							metadata: {
								lqip: 'data:image/png;base64,abc',
								dimensions: { width: 1000, height: 600, aspectRatio: 1.66 },
							},
						},
						alt: 'Netz Struktur',
					},
				},
				{
					itemTitle: 'Transformers',
					subtitle: 'Aufmerksamkeit und Kontext',
					link: '/wasistki/technischemethodiken/transformers',
					image: {
						asset: {
							_id: 'img-2',
							url: 'https://cdn.sanity.io/images/project/image-2.jpg',
							metadata: {
								lqip: 'data:image/png;base64,def',
								dimensions: { width: 1200, height: 700, aspectRatio: 1.71 },
							},
						},
						alt: 'Transformer Grafik',
					},
				},
			],
		})

		const ui = await TechMethodsPage()
		render(ui as React.ReactElement)

		expect(screen.getByLabelText('breadcrumbs')).toBeInTheDocument()
		expect(
			screen.getByRole('heading', { level: 1, name: 'Technische Methodiken' }),
		).toBeInTheDocument()
		expect(
			screen
				.getByRole('img', { name: 'Netz Struktur' })
				.getAttribute('data-src'),
		).toContain('w=1200')
		expect(
			screen
				.getByRole('img', { name: 'Transformer Grafik' })
				.getAttribute('data-src'),
		).toContain('w=1600')
	})
})
