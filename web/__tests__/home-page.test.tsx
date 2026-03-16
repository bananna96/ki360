import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import { client } from '@/lib/sanity/client'

jest.mock('@/lib/sanity/client', () => ({
	client: {
		fetch: jest.fn(),
	},
}))

jest.mock('next/image', () => ({
	__esModule: true,
	default: (props: any) => <img {...props} />,
}))

jest.mock('@/components/custom/Icons', () => ({
	Icon: () => <span data-testid='mock-icon' />,
}))

jest.mock('@/components/custom/Link', () => ({
	IconTextLink: ({ href, text }: { href: string; text: string }) => (
		<a href={href}>{text}</a>
	),
}))

describe('Home page', () => {
	it('renders sanity content and links', async () => {
		const fetchMock = client.fetch as jest.Mock
		fetchMock.mockResolvedValue({
			title: 'KI360 Start',
			subtitle: 'Untertitel',
			content: 'Inhalt der Seite',
			links: [
				{ text: 'Mehr zu KI', url: '/wasistki' },
				{ text: 'Prompten', url: '/prompten' },
			],
		})

		const ui = await Home()
		render(ui as React.ReactElement)

		expect(
			screen.getByRole('heading', { level: 1, name: 'KI360 Start' }),
		).toBeInTheDocument()
		expect(screen.getByText('Untertitel')).toBeInTheDocument()
		expect(screen.getByText('Inhalt der Seite')).toBeInTheDocument()
		expect(screen.getByRole('link', { name: 'Mehr zu KI' })).toHaveAttribute(
			'href',
			'/wasistki',
		)
		expect(screen.getByRole('link', { name: 'Prompten' })).toHaveAttribute(
			'href',
			'/prompten',
		)
	})
})
