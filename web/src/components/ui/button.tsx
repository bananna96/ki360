import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'
import { Icon, type IconName } from '@/components/custom/Icons'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:cursor-pointer',
	{
		variants: {
			variant: {
				default:
					'bg-(--color-granite) text-primary-foreground hover:bg-bg-(--color-skyBlue)',
				destructive:
					'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost:
					'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9',
				'icon-xs': "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
				'icon-sm': 'size-8',
				'icon-lg': 'size-10',
				'icon-xl': 'size-12',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

function Button({
	className,
	variant = 'default',
	size = 'default',
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	}) {
	const Comp = asChild ? Slot.Root : 'button'

	return (
		<Comp
			data-slot='button'
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

type IconButtonProps = Omit<
	React.ComponentProps<'button'>,
	'children' | 'aria-label'
> &
	VariantProps<typeof buttonVariants> & {
		icon: IconName
		ariaLabel: string
		iconColor?: string
		hoverIconColor?: string
		iconSize?: number
	}

function IconButton({
	icon,
	ariaLabel,
	iconColor = 'currentColor',
	hoverIconColor,
	iconSize = 20,
	variant = 'ghost',
	size = 'icon',
	type = 'button',
	className,
	...props
}: IconButtonProps) {
	return (
		<Button
			type={type}
			variant={variant}
			size={size}
			className={cn('group', className)}
			aria-label={ariaLabel}
			style={
				{
					color: iconColor,
					'--icon-hover-color': hoverIconColor ?? iconColor,
				} as React.CSSProperties
			}
			{...props}
		>
			<Icon
				name={icon}
				color='currentColor'
				size={iconSize}
				className='transition-colors duration-200 text-current group-hover:text-[var(--icon-hover-color)]'
			/>
		</Button>
	)
}

export { Button, buttonVariants, IconButton }
