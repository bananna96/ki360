import { fireEvent, render, screen } from '@testing-library/react'
import { ReadButton } from '@/components/custom/ReadBtn'

jest.mock('@/components/ui/button', () => ({
	IconButton: ({
		ariaLabel,
		onClick,
		disabled,
	}: {
		ariaLabel: string
		onClick?: () => void
		disabled?: boolean
	}) => (
		<button
			type='button'
			aria-label={ariaLabel}
			onClick={onClick}
			disabled={disabled}
		>
			{ariaLabel}
		</button>
	),
}))

class MockSpeechSynthesisUtterance {
	text: string
	lang = ''
	rate = 1
	pitch = 1
	onend: (() => void) | null = null
	onerror: (() => void) | null = null

	constructor(text: string) {
		this.text = text
	}
}

describe('ReadButton', () => {
	it('starts and stops speech synthesis on toggle', () => {
		const cancel = jest.fn()
		const speak = jest.fn((utterance: MockSpeechSynthesisUtterance) => {
			utterance.onend?.()
		})

		Object.defineProperty(window, 'speechSynthesis', {
			value: { cancel, speak },
			configurable: true,
		})
		Object.defineProperty(window, 'SpeechSynthesisUtterance', {
			value: MockSpeechSynthesisUtterance,
			configurable: true,
		})

		render(<ReadButton text='Hallo Welt' />)

		const startButton = screen.getByRole('button', { name: 'Text vorlesen' })
		fireEvent.click(startButton)

		expect(speak).toHaveBeenCalledTimes(1)
		expect(cancel).toHaveBeenCalled()
	})

	it('does nothing when disabled', () => {
		const cancel = jest.fn()
		const speak = jest.fn()

		Object.defineProperty(window, 'speechSynthesis', {
			value: { cancel, speak },
			configurable: true,
		})
		Object.defineProperty(window, 'SpeechSynthesisUtterance', {
			value: MockSpeechSynthesisUtterance,
			configurable: true,
		})

		render(
			<ReadButton
				text='Hallo Welt'
				disabled
			/>,
		)

		fireEvent.click(screen.getByRole('button', { name: 'Text vorlesen' }))
		expect(speak).not.toHaveBeenCalled()
	})
})
