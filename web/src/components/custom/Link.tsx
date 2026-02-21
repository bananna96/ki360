'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from './Icons'

function TextLink({
	href,
	className,
	text,
}: {
	href: string
	className?: string
	text: string
}) {
	const pathname = usePathname()
	const isActive = pathname === href
	return (
		<Link
			href={href}
			className={`${className} ${isActive ? 'font-bold' : ''}`}
			aria-current={isActive ? 'page' : undefined}
		>
			{text}
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
}: {
	href: string
	ariaLabel: string
	className?: string
	text: string
	icon: string
	colorVar: string
	hoverColorVar: string
}) {
	return (
		<Link
			href={href}
			aria-label={ariaLabel}
			className={`${className ?? ''} group flex items-center gap-2 justify-end transition-colors`}
			style={{
				// TODO: Umbauen oder schöner machen
				['--link-color' as any]: `var(${colorVar})`,
				['--link-hover' as any]: `var(${hoverColorVar})`,
			}}
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

export { TextLink, IconTextLink }
