import React from 'react'
import { render, screen } from '@testing-library/react'
import PromptenChatPage from '@/app/prompten/chat/page'
import { client } from '@/lib/sanity/client'

jest.mock('@/lib/sanity/client', () => ({
	client: {
		fetch: jest.fn(),
	},
}))

jest.mock('@/components/custom/Breadcrumbs', () => ({
	Breadcrumbs: () => <nav aria-label='breadcrumbs'>Breadcrumbs</nav>,
}))

jest.mock('@/components/custom/ChatBot', () => ({
	ChatBot: () => <section>ChatBot</section>,
}))

describe('Prompten Chat page', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders breadcrumbs and chatbot shell', async () => {
		const fetchMock = client.fetch as jest.Mock
		fetchMock.mockResolvedValue({ slides: [] })

		const ui = await PromptenChatPage()
		render(ui as React.ReactElement)

		expect(screen.getByLabelText('breadcrumbs')).toBeInTheDocument()
		expect(screen.getByText('ChatBot')).toBeInTheDocument()
	})
})
