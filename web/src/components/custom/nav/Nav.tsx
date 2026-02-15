import Link from 'next/link'
import Image from 'next/image'
import { TextLink } from '../Link'
import type { NavProps } from './types'
import MobileNav from './MobileNav'

export default function Nav({ links }: NavProps) {
	return (
		<>
			<nav
				className='bg-[var(--color-frost)] w-full flex h-[4em] items-center justify-between p-3 fixed top-0 left-0 z-50'
				aria-label='Hauptnavigation'
			>
				<Link
					href='/'
					aria-label='Zur Startseite'
					className='relative h-full w-fit aspect-square'
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
					className='hidden md:flex gap-15'
					role='list'
				>
					{links.map((link) => {
						return (
							<li key={link.name}>
								<TextLink
									className={`hover:underline focus:underline-2 focus:underline-offset-2`}
									href={link.href}
									text={link.name}
								/>
							</li>
						)
					})}
				</ul>
				<MobileNav
					links={links}
					className='flex md:hidden'
				/>
			</nav>
		</>
	)
}
