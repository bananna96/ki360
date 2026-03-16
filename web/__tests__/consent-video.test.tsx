import { fireEvent, render, screen } from '@testing-library/react'
import { ConsentVideo } from '@/components/custom/ConsentVideo'

const openPreferences = jest.fn()

jest.mock('@/components/custom/CookieBanner', () => ({
	useCookieConsent: () => ({ openPreferences }),
}))

describe('ConsentVideo', () => {
	beforeEach(() => {
		localStorage.clear()
		openPreferences.mockReset()
	})

	it('shows consent prompt when cookies are not accepted', () => {
		render(
			<ConsentVideo
				src='https://example.com/video'
				title='Demo'
			/>,
		)

		expect(
			screen.getByText(/Bitte akzeptiere die Cookies, um das Video zu sehen/i),
		).toBeInTheDocument()

		fireEvent.click(
			screen.getByRole('button', { name: 'Cookie-Einstellungen öffnen' }),
		)
		expect(openPreferences).toHaveBeenCalledTimes(1)
	})

	it('renders iframe when cookie consent is accepted', () => {
		localStorage.setItem('cookie_consent', 'accepted')

		render(
			<ConsentVideo
				src='https://example.com/video'
				title='Demo'
			/>,
		)

		const iframe = screen.getByTitle('Demo')
		expect(iframe).toBeInTheDocument()
		expect(iframe.tagName.toLowerCase()).toBe('iframe')
	})
})
