import { render, screen, within } from '@testing-library/react'
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

jest.mock('lucide-react', () => ({
	ChevronRight: () => <svg data-testid='icon-chevron-right' />,
	MoreHorizontal: () => <svg data-testid='icon-more-horizontal' />,
}))

describe('ui/breadcrumb', () => {
	it('renders full breadcrumb semantics and elements', () => {
		render(
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Start</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Aktuell</BreadcrumbPage>
					</BreadcrumbItem>
					<BreadcrumbEllipsis />
				</BreadcrumbList>
			</Breadcrumb>,
		)

		const nav = screen.getByLabelText('breadcrumb')
		expect(nav).toHaveAttribute('data-slot', 'breadcrumb')
		expect(screen.getByRole('link', { name: 'Start' })).toHaveAttribute(
			'href',
			'/',
		)

		const current = screen.getByRole('link', { name: 'Aktuell' })
		expect(current).toHaveAttribute('aria-current', 'page')
		expect(current).toHaveAttribute('aria-disabled', 'true')

		const separator = nav.querySelector('[data-slot="breadcrumb-separator"]')
		expect(separator).toBeInTheDocument()
		expect(
			within(separator as HTMLElement).getByTestId('icon-chevron-right'),
		).toBeInTheDocument()

		expect(screen.getByText('More')).toBeInTheDocument()
		expect(screen.getByTestId('icon-more-horizontal')).toBeInTheDocument()
	})
})
