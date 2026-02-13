'use client'
import Link from 'next/link'
import { JSX } from 'react'
import { usePathname } from 'next/navigation'

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
}: {
	href: string
	ariaLabel: string
	className?: string
	text: string
	icon: JSX.Element
}) {
	return (
		<Link
			href={href}
			className={className}
			aria-label={ariaLabel}
		>
			{text}
			{icon}
		</Link>
	)
}

export { TextLink, IconTextLink }
