'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from './Icons'
import { Button } from '../ui/button'

function TextLink({
	href,
	className,
	text,
	openInNewTab,
}: {
	href: string
	className?: string
	text: string
	openInNewTab?: boolean
}) {
	const pathname = usePathname()
	const isActive = pathname === href
	return (
		<Link
			href={href}
			className={`${className} ${isActive ? 'font-bold' : ''}`}
			aria-current={isActive ? 'page' : undefined}
			target={openInNewTab ? '_blank' : undefined}
			rel={openInNewTab ? 'noopener noreferrer' : undefined}
		>
			{text}
		</Link>
	)
}

function ButtonLink({
	href,
	className,
	text,
	openInNewTab,
}: {
	href: string
	className?: string
	text: string
	openInNewTab?: boolean
}) {
	const pathname = usePathname()
	const isActive = pathname === href
	return (
		<Link
			href={href}
			className={`${className} ${isActive ? 'font-bold' : ''}`}
			aria-current={isActive ? 'page' : undefined}
			target={openInNewTab ? '_blank' : undefined}
			rel={openInNewTab ? 'noopener noreferrer' : undefined}
		>
			<Button className='bg-(--color-ochre) hover:bg-(--color-skyBlue) text-(--color-glossyBlack)'>
				{text}
			</Button>
		</Link>
	)
}

function IconTextLink({
	href,
	ariaLabel,
	className,
	text,
	icon,
	colorVar,
	hoverColorVar,
	openInNewTab,
}: {
	href: string
	ariaLabel: string
	className?: string
	text: string
	icon: string
	colorVar: string
	hoverColorVar: string
	openInNewTab?: boolean
}) {
	return (
		<Link
			href={href}
			aria-label={ariaLabel}
			className={`${className ?? ''} group flex items-center gap-2 justify-end transition-colors`}
			style={{
				['--link-color' as any]: `var(${colorVar})`,
				['--link-hover' as any]: `var(${hoverColorVar})`,
			}}
			target={openInNewTab ? '_blank' : undefined}
			rel={openInNewTab ? 'noopener noreferrer' : undefined}
		>
			<Icon
				name={icon}
				color='currentColor'
				className='text-(--link-color) group-hover:text-(--link-hover) transition-colors'
			/>
			<span className='text-(--link-color) group-hover:text-(--link-hover) transition-colors'>
				{text}
			</span>
		</Link>
	)
}

export { TextLink, IconTextLink, ButtonLink }
