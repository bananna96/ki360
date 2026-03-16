import { render, screen } from '@testing-library/react'
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

describe('ui/card', () => {
	it('renders all card slots with their content', () => {
		const { container } = render(
			<Card>
				<CardHeader>
					<CardTitle>Titel</CardTitle>
					<CardDescription>Beschreibung</CardDescription>
					<CardAction>Aktion</CardAction>
				</CardHeader>
				<CardContent>Inhalt</CardContent>
				<CardFooter>Footer</CardFooter>
			</Card>,
		)

		expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument()
		expect(
			container.querySelector('[data-slot="card-header"]'),
		).toBeInTheDocument()
		expect(
			container.querySelector('[data-slot="card-title"]'),
		).toBeInTheDocument()
		expect(
			container.querySelector('[data-slot="card-description"]'),
		).toBeInTheDocument()
		expect(
			container.querySelector('[data-slot="card-action"]'),
		).toBeInTheDocument()
		expect(
			container.querySelector('[data-slot="card-content"]'),
		).toBeInTheDocument()
		expect(
			container.querySelector('[data-slot="card-footer"]'),
		).toBeInTheDocument()

		expect(screen.getByText('Titel')).toBeInTheDocument()
		expect(screen.getByText('Beschreibung')).toBeInTheDocument()
		expect(screen.getByText('Aktion')).toBeInTheDocument()
		expect(screen.getByText('Inhalt')).toBeInTheDocument()
		expect(screen.getByText('Footer')).toBeInTheDocument()
	})
})
