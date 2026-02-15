import { client } from '@/lib/sanity/client'
import { navQuery } from '@/lib/sanity/queries'
import Link from 'next/link'
import { TextLink } from '../Link'
import type { NavLink } from './types'
import MobileNav from './MobileNav'
import { urlForImage } from '@/lib/sanity/utils'
import { SanityImage } from '@/components/SanityImage'

export default async function Nav() {
	const nav = await client.fetch(navQuery)
	console.log('Fetched navigation items:', nav) // Debugging: Log the fetched navigation items
	const imgAssets = urlForImage(nav.navlogo.asset)

	return (
		<>
			<nav
				className='bg-[var(--color-frost)] w-full flex h-[4em] items-center justify-between p-3 fixed top-0 left-0 z-50'
				aria-label='Hauptnavigation'
			>
				<Link
					href={nav.navlogolink} // TODO: besser lösung für link? damit
					aria-label='Zur Startseite'
					className='relative h-full w-fit aspect-square'
				>
					<SanityImage
						src={imgAssets}
						className='object-contain'
						// The crucial part for performance:
						sizes='(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw'
						fill
						alt='ki360 Logo'
					/>
				</Link>

				<ul
					className='hidden md:flex gap-15'
					role='list'
				>
					{nav.items.map((link: NavLink) => {
						return (
							<li key={link.text}>
								<TextLink
									className={`hover:underline focus:underline-2 focus:underline-offset-2`}
									href={link.url}
									text={link.text}
								/>
							</li>
						)
					})}
				</ul>
				<MobileNav
					links={nav.items}
					className='flex md:hidden'
				/>
			</nav>
		</>
	)
}
