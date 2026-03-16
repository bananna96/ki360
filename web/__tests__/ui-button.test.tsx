import { fireEvent, render, screen } from '@testing-library/react'
import { Button, IconButton } from '@/components/ui/button'

jest.mock('@/components/custom/Icons', () => ({
	Icon: ({ name, className }: { name: string; className?: string }) => (
		<svg
			data-testid={`icon-${name}`}
			className={className}
		/>
	),
}))

describe('ui/button', () => {
	it('renders Button with variant and size data attributes', () => {
		render(
			<Button
				variant='secondary'
				size='sm'
			>
				Click
			</Button>,
		)

		const button = screen.getByRole('button', { name: 'Click' })
		expect(button).toHaveAttribute('data-slot', 'button')
		expect(button).toHaveAttribute('data-variant', 'secondary')
		expect(button).toHaveAttribute('data-size', 'sm')
	})

	it('renders Button as child element when asChild is true', () => {
		render(
			<Button asChild>
				<a href='/ziel'>Zum Ziel</a>
			</Button>,
		)

		expect(screen.getByRole('link', { name: 'Zum Ziel' })).toHaveAttribute(
			'href',
			'/ziel',
		)
	})

	it('renders IconButton with aria label and triggers click handler', () => {
		const onClick = jest.fn()
		render(
			<IconButton
				icon='cancel'
				ariaLabel='Menue oeffnen'
				onClick={onClick}
				hoverIconColor='#ff0000'
			/>,
		)

		const button = screen.getByRole('button', { name: 'Menue oeffnen' })
		expect(button).toHaveStyle('--icon-hover-color: #ff0000')
		expect(screen.getByTestId('icon-cancel')).toBeInTheDocument()

		fireEvent.click(button)
		expect(onClick).toHaveBeenCalledTimes(1)
	})
})
