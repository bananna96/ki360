import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { CookieBanner } from '@/components/custom/CookieBanner'

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

describe('CookieBanner', () => {
	beforeEach(() => {
		localStorage.clear()
	})

	it('shows the banner when no consent exists and accepts consent', async () => {
		const onAccept = jest.fn()
		const onDecline = jest.fn()

		render(
			<CookieBanner
				onAccept={onAccept}
				onDecline={onDecline}
			/>,
		)

		expect(
			screen.getByRole('dialog', { name: 'Cookie-Einstellungen' }),
		).toBeInTheDocument()

		fireEvent.click(screen.getByRole('button', { name: 'Akzeptieren' }))

		await waitFor(() => {
			expect(onAccept).toHaveBeenCalledTimes(1)
		})
		expect(onDecline).not.toHaveBeenCalled()
		expect(localStorage.getItem('cookie_consent')).toBe('accepted')
	})
})
