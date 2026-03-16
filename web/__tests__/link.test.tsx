import { render, screen } from '@testing-library/react'
import { ButtonLink, TextLink } from '@/components/custom/Link'

const mockUsePathname = jest.fn()

jest.mock('@/components/custom/Icons', () => ({
	Icon: () => null,
}))

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

describe('custom links', () => {
	beforeEach(() => {
		mockUsePathname.mockReset()
	})

	it('marks TextLink as active when pathname matches', () => {
		mockUsePathname.mockReturnValue('/about')

		render(
			<TextLink
				href='/about'
				text='About'
			/>,
		)

		expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
			'aria-current',
			'page',
		)
	})

	it('renders ButtonLink with external target attributes', () => {
		mockUsePathname.mockReturnValue('/')

		render(
			<ButtonLink
				href='https://example.com'
				text='Extern'
				openInNewTab
			/>,
		)

		expect(screen.getByRole('link', { name: 'Extern' })).toHaveAttribute(
			'target',
			'_blank',
		)
		expect(screen.getByRole('link', { name: 'Extern' })).toHaveAttribute(
			'rel',
			'noopener noreferrer',
		)
	})
})
