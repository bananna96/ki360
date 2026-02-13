'use client' // TODO: in Link component?
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export interface NavLink {
	name: string
	href: string
}

interface NavProps {
	links: NavLink[]
}

export default function Nav({ links }: NavProps) {
	const pathname = usePathname()
	return (
		<nav
			className='bg-[var(--color-frost)] w-full flex h-[3em] items-center justify-between rounded-md p-3 fixed top-0 left-0 z-50'
			aria-label='Hauptnavigation'
		>
			<Link
				href='/'
				aria-label='Zur Startseite'
				className='relative h-full w-auto aspect-square'
			>
				<Image
					src='/Logo.png'
					alt='ki360 Logo'
					className='object-contain'
					fill
					priority
				/>
			</Link>

			<ul
				className='flex gap-4'
				role='list'
			>
				{links.map((link) => {
					const isActive = pathname === link.href
					return (
						<li key={link.name}>
							<Link
								href={link.href}
								className={`hover:underline focus:underline-2 focus:underline-offset-2 ${isActive ? 'font-bold' : ''}`}
								aria-current={isActive ? 'page' : undefined}
							>
								<span>{link.name}</span>
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
