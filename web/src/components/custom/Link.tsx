'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from './Icons'
import { getIconColor } from '@/lib/utils'

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
	// TODO: ausarbeiten
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
			className={`${className} group flex justify-end text-[var(${colorVar})] transition-colors`}
			aria-label={ariaLabel}
		>
			<Icon
				name={icon}
				color='currentColor'
				className={`transition-colors group-hover:text-[var(${hoverColorVar})]`}
			/>
			<span
				className={`transition-colors group-hover:text-[var(${hoverColorVar})]`}
			>
				{text}
			</span>
		</Link>
	)
}

export { TextLink, IconTextLink }
