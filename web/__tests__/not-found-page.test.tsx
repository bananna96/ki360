import { render, screen } from '@testing-library/react'
import NotFound from '@/app/not-found'

jest.mock('next/dist/client/link', () => {
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

describe('NotFound page', () => {
	it('renders 404 state and home navigation link', () => {
		render(<NotFound />)

		expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
		expect(screen.getByText('Page Not Found')).toBeInTheDocument()
		expect(screen.getByRole('link', { name: 'Startseite' })).toHaveAttribute(
			'href',
			'/',
		)
	})
})
