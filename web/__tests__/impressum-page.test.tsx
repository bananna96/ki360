import React from 'react'
import { render, screen } from '@testing-library/react'
import ImprintPage from '@/app/about/impressum/page'
import { client } from '@/lib/sanity/client'

jest.mock('@/lib/sanity/client', () => ({
	client: {
		fetch: jest.fn(),
	},
}))

describe('Impressum page', () => {
	it('renders title, section headings and list entries from Sanity', async () => {
		const fetchMock = client.fetch as jest.Mock
		fetchMock.mockResolvedValue({
			title: 'Impressum',
			content: [
				{
					title: 'Anbieter',
					paragraphs: ['Max Mustermann', 'Musterstrasse 1'],
					listTitle: 'Kontakt',
					listItems: ['mail@example.com', '+49 123 456'],
				},
			],
		})

		const ui = await ImprintPage()
		render(ui as React.ReactElement)

		expect(screen.getByText('Impressum')).toBeInTheDocument()
		expect(
			screen.getByRole('heading', { name: 'Anbieter' }),
		).toBeInTheDocument()
		expect(screen.getByText('Max Mustermann')).toBeInTheDocument()
		expect(screen.getByText('Kontakt')).toBeInTheDocument()
		expect(screen.getByText('mail@example.com')).toBeInTheDocument()
	})
})
