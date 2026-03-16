import { render, screen } from '@testing-library/react'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerPortal,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'

jest.mock('vaul', () => {
	const React = require('react')

	const primitive = {
		Root: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<div
				data-primitive='root'
				{...props}
			>
				{children}
			</div>
		),
		Trigger: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<button
				data-primitive='trigger'
				{...props}
			>
				{children}
			</button>
		),
		Portal: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<div
				data-primitive='portal'
				{...props}
			>
				{children}
			</div>
		),
		Close: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<button
				data-primitive='close'
				{...props}
			>
				{children}
			</button>
		),
		Overlay: React.forwardRef(function Overlay(
			{ children, ...props }: React.PropsWithChildren<Record<string, unknown>>,
			ref: React.Ref<HTMLDivElement>,
		) {
			return (
				<div
					ref={ref}
					data-primitive='overlay'
					{...props}
				>
					{children}
				</div>
			)
		}),
		Content: React.forwardRef(function Content(
			{ children, ...props }: React.PropsWithChildren<Record<string, unknown>>,
			ref: React.Ref<HTMLDivElement>,
		) {
			return (
				<section
					ref={ref}
					data-primitive='content'
					{...props}
				>
					{children}
				</section>
			)
		}),
		Title: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<h2
				data-primitive='title'
				{...props}
			>
				{children}
			</h2>
		),
		Description: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<p
				data-primitive='description'
				{...props}
			>
				{children}
			</p>
		),
	}

	return { Drawer: primitive }
})

describe('ui/drawer', () => {
	it('renders wrapper and primitive slot attributes', () => {
		const { container } = render(
			<Drawer>
				<DrawerTrigger>Open</DrawerTrigger>
				<DrawerPortal>
					<DrawerOverlay />
				</DrawerPortal>
				<DrawerContent>
					<DrawerHeader>Header</DrawerHeader>
					<DrawerTitle>Titel</DrawerTitle>
					<DrawerDescription>Beschreibung</DrawerDescription>
					<DrawerFooter>
						<DrawerClose>Schliessen</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>,
		)

		expect(container.querySelector('[data-slot="drawer"]')).toBeInTheDocument()
		expect(
			container.querySelector('[data-slot="drawer-trigger"]'),
		).toBeInTheDocument()
		expect(
			container.querySelector('[data-slot="drawer-portal"]'),
		).toBeInTheDocument()
		expect(
			container.querySelector('[data-primitive="overlay"]'),
		).toBeInTheDocument()
		expect(
			container.querySelector('[data-primitive="content"]'),
		).toBeInTheDocument()
		expect(
			container.querySelector('[data-slot="drawer-header"]'),
		).toBeInTheDocument()
		expect(
			container.querySelector('[data-slot="drawer-title"]'),
		).toBeInTheDocument()
		expect(
			container.querySelector('[data-slot="drawer-description"]'),
		).toBeInTheDocument()
		expect(
			container.querySelector('[data-slot="drawer-footer"]'),
		).toBeInTheDocument()
		expect(
			container.querySelector('[data-slot="drawer-close"]'),
		).toBeInTheDocument()

		expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
		expect(
			screen.getByRole('heading', { level: 2, name: 'Titel' }),
		).toBeInTheDocument()
		expect(screen.getByText('Beschreibung')).toBeInTheDocument()
	})
})
