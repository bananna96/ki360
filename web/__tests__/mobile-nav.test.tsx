import { fireEvent, render, screen } from '@testing-library/react'
import MobileNav from '@/components/custom/nav/MobileNav'

jest.mock('next/link', () => {
	return function MockLink({
		href,
		children,
		onClick,
		...props
	}: React.PropsWithChildren<{ href: string; onClick?: () => void }>) {
		return (
			<a
				href={href}
				onClick={onClick}
				{...props}
			>
				{children}
			</a>
		)
	}
})

describe('MobileNav', () => {
	it('opens and closes menu, and closes on link click', () => {
		render(
			<MobileNav
				links={[{ text: 'Start', url: '/' }, { text: 'Kategorie' }]}
			/>,
		)

		fireEvent.click(screen.getByRole('button', { name: 'Menü öffnen' }))
		expect(
			screen.getByRole('button', { name: 'Menü schließen' }),
		).toBeInTheDocument()

		fireEvent.click(screen.getByRole('link', { name: 'Start' }))
		expect(
			screen.queryByRole('button', { name: 'Menü schließen' }),
		).not.toBeInTheDocument()

		fireEvent.click(screen.getByRole('button', { name: 'Menü öffnen' }))
		fireEvent.click(screen.getByRole('button', { name: 'Menü schließen' }))
		expect(
			screen.queryByRole('button', { name: 'Menü schließen' }),
		).not.toBeInTheDocument()
	})
})
