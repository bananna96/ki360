import { render, screen } from '@testing-library/react'
import { Breadcrumbs } from '@/components/custom/Breadcrumbs'

const mockUsePathname = jest.fn()

jest.mock('next/navigation', () => ({
	usePathname: () => mockUsePathname(),
}))

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

describe('Breadcrumbs', () => {
	it('renders the current path as breadcrumb trail', () => {
		mockUsePathname.mockReturnValue('/wasistki/technischemethodiken')

		render(<Breadcrumbs />)

		expect(screen.getByRole('link', { name: 'Startseite' })).toHaveAttribute(
			'href',
			'/',
		)
		expect(screen.getByRole('link', { name: 'Wasistki' })).toHaveAttribute(
			'href',
			'/wasistki',
		)
		expect(screen.getByText('Technischemethodiken')).toHaveAttribute(
			'aria-current',
			'page',
		)
	})
})
