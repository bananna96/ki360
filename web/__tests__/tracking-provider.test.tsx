import { fireEvent, render, screen } from '@testing-library/react'
import { TrackingProvider } from '@/components/custom/TrackingProvider'

jest.mock('@/components/custom/CookieBanner', () => ({
	CookieBanner: ({ onAccept, onDecline }: any) => (
		<div>
			<button onClick={onAccept}>accept</button>
			<button onClick={onDecline}>decline</button>
		</div>
	),
}))

describe('TrackingProvider', () => {
	it('renders children and shows matomo script only after accept', () => {
		render(
			<TrackingProvider matomoScript={<div>matomo-script</div>}>
				<div>app-content</div>
			</TrackingProvider>,
		)

		expect(screen.getByText('app-content')).toBeInTheDocument()
		expect(screen.queryByText('matomo-script')).not.toBeInTheDocument()

		fireEvent.click(screen.getByRole('button', { name: 'accept' }))
		expect(screen.getByText('matomo-script')).toBeInTheDocument()

		fireEvent.click(screen.getByRole('button', { name: 'decline' }))
		expect(screen.queryByText('matomo-script')).not.toBeInTheDocument()
	})
})
