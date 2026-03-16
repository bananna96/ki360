import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ChatBot } from '@/components/custom/ChatBot'

jest.mock('@/components/ui/button', () => ({
	Button: ({
		children,
		...props
	}: React.PropsWithChildren<Record<string, unknown>>) => (
		<button {...props}>{children}</button>
	),
	IconButton: ({
		ariaLabel,
		onClick,
		disabled,
		className,
	}: {
		ariaLabel: string
		onClick?: React.MouseEventHandler<HTMLButtonElement>
		disabled?: boolean
		className?: string
	}) => (
		<button
			aria-label={ariaLabel}
			onClick={onClick}
			disabled={disabled}
			className={className}
		/>
	),
}))

describe('ChatBot', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		global.fetch = jest.fn()
	})

	it('sends a user message and renders bot response with remaining requests', async () => {
		const fetchMock = global.fetch as jest.Mock
		fetchMock.mockResolvedValue({
			ok: true,
			json: async () => ({ reply: 'Verbesserter Prompt', remaining: 4 }),
		})

		render(<ChatBot />)

		const input = screen.getByPlaceholderText(
			'Schreibe einen Prompt zum Üben...',
		)
		fireEvent.change(input, { target: { value: 'Mein erster Prompt' } })
		fireEvent.click(screen.getByRole('button', { name: 'Senden' }))

		expect(screen.getByText('Mein erster Prompt')).toBeInTheDocument()

		await waitFor(() => {
			expect(fetchMock).toHaveBeenCalledTimes(1)
			expect(fetchMock).toHaveBeenCalledWith('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: [{ role: 'user', content: 'Mein erster Prompt' }],
				}),
			})
		})

		expect(await screen.findByText('Verbesserter Prompt')).toBeInTheDocument()
		expect(screen.getByText('4 Anfragen übrig')).toBeInTheDocument()
	})
})
