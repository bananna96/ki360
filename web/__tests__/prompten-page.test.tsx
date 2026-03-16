import React from 'react'
import { render, screen } from '@testing-library/react'
import PromptenPage from '@/app/prompten/page'
import { client } from '@/lib/sanity/client'

jest.mock('@/lib/sanity/client', () => ({
	client: {
		fetch: jest.fn(),
	},
}))

jest.mock('@/components/custom/PromptSlider', () => ({
	PromptSlider: ({ slidesContent }: { slidesContent: unknown[] }) => (
		<div data-testid='prompt-slider'>{slidesContent.length}</div>
	),
}))

jest.mock('@/components/custom/Link', () => ({
	ButtonLink: ({ href, text }: { href: string; text: string }) => (
		<a href={href}>{text}</a>
	),
}))

describe('Prompten page', () => {
	it('renders intro, slider and CTA button from Sanity data', async () => {
		const fetchMock = client.fetch as jest.Mock
		fetchMock.mockResolvedValue({
			intro: { title: 'Prompting', description: 'Lerne besser prompten' },
			slides: [
				{ tip: { title: 'A', description: 'B' }, bullets: ['x'], example: 'y' },
			],
			btnLink: { text: 'Zum Chat', url: '/prompten/chat' },
		})

		const ui = await PromptenPage()
		render(ui as React.ReactElement)

		expect(
			screen.getByRole('heading', { name: 'Prompting' }),
		).toBeInTheDocument()
		expect(screen.getByText('Lerne besser prompten')).toBeInTheDocument()
		expect(screen.getByTestId('prompt-slider')).toHaveTextContent('1')
		expect(screen.getByRole('link', { name: 'Zum Chat' })).toHaveAttribute(
			'href',
			'/prompten/chat',
		)
	})
})
