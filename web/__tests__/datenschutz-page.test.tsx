import React from 'react'
import { render, screen } from '@testing-library/react'
import PrivacyPage from '@/app/about/datenschutz/page'
import { client } from '@/lib/sanity/client'

jest.mock('@/lib/sanity/client', () => ({
	client: {
		fetch: jest.fn(),
	},
}))

describe('Datenschutz page', () => {
	it('renders privacy content sections from Sanity', async () => {
		const fetchMock = client.fetch as jest.Mock
		fetchMock.mockResolvedValue({
			title: 'Datenschutz',
			content: [
				{
					title: 'Allgemeine Hinweise',
					paragraphs: ['Wir nehmen Datenschutz ernst.'],
					listItems: ['IP-Adresse', 'Nutzungsdaten'],
				},
			],
		})

		const ui = await PrivacyPage()
		render(ui as React.ReactElement)

		expect(screen.getByText('Datenschutz')).toBeInTheDocument()
		expect(
			screen.getByRole('heading', { name: 'Allgemeine Hinweise' }),
		).toBeInTheDocument()
		expect(
			screen.getByText('Wir nehmen Datenschutz ernst.'),
		).toBeInTheDocument()
		expect(screen.getByText('IP-Adresse')).toBeInTheDocument()
		expect(screen.getByText('Nutzungsdaten')).toBeInTheDocument()
	})
})
