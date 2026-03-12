import { client } from '@/lib/sanity/client'
import { navQuery } from '@/lib/sanity/queries'
import Link from 'next/link'
import { TextLink } from '../Link'
import MobileNav from './MobileNav'
import { urlForImage } from '@/lib/sanity/utils'
import { SanityImage } from '@/components/SanityImage'

type NavSubItem = {
	text: string
	url: string
}

type NavItem = {
	text: string
	url: string
	subitems?: NavSubItem[]
}

export default async function Nav() {
	const nav = await client.fetch(navQuery)
	const imgAssets = urlForImage(nav.navlogo.asset)

	return (
		<>
			<nav
				className='bg-(--color-frost) w-full flex h-(--height-nav) items-center justify-between p-3 fixed top-0 left-0 z-50'
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
						fill
						alt='ki360 Logo'
					/>
				</Link>

				<ul
					className='hidden md:flex gap-15'
					role='list'
				>
					{nav.items.map((link: NavItem) => {
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
