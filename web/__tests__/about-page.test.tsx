import React from 'react'
import { render, screen } from '@testing-library/react'
import AboutPage from '@/app/about/page'
import { client } from '@/lib/sanity/client'

jest.mock('@/lib/sanity/client', () => ({
	client: {
		fetch: jest.fn(),
	},
}))

jest.mock('@/components/SanityImage', () => ({
	SanityImage: (props: any) => (
		<img
			alt={props.alt}
			src={props.src}
		/>
	),
}))

jest.mock('@/components/custom/Link', () => ({
	IconTextLink: ({ href, text }: { href: string; text: string }) => (
		<a href={href}>{text}</a>
	),
}))

describe('About page', () => {
	it('renders core content, image and legal links', async () => {
		const fetchMock = client.fetch as jest.Mock
		fetchMock.mockResolvedValue({
			title: 'Ueber uns',
			subtitle: 'Unsere Mission',
			image: { asset: { url: 'https://cdn.sanity.io/test.jpg' }, alt: 'Team' },
			content: [
				{ title: 'Werte', paragraphs: ['Transparenz'], listItems: ['Lernen'] },
			],
		})

		const ui = await AboutPage()
		render(ui as React.ReactElement)

		expect(
			screen.getByRole('heading', { level: 1, name: 'Ueber uns' }),
		).toBeInTheDocument()
		expect(screen.getByText('Unsere Mission')).toBeInTheDocument()
		expect(screen.getByRole('img', { name: 'Team' })).toBeInTheDocument()
		expect(screen.getByRole('link', { name: 'Impressum' })).toHaveAttribute(
			'href',
			'/about/impressum',
		)
		expect(screen.getByRole('link', { name: 'Datenschutz' })).toHaveAttribute(
			'href',
			'/about/datenschutz',
		)
	})
})
