import { client } from '@/lib/sanity/client'
import { navQuery } from '@/lib/sanity/queries'
import Link from 'next/link'
import { TextLink } from '../Link'
import type { NavLink } from './types'
import MobileNav from './MobileNav'
import { urlForImage } from '@/lib/sanity/utils'
import { SanityImage } from '@/components/SanityImage'

export default async function Footer() {
	const nav = await client.fetch(navQuery)
	const imgAssets = urlForImage(nav.navlogo.asset)

	return (
		<>
			<footer
				className='bg-[var(--color-glossyBlack)]  flex items-center justify-between p-3'
				aria-label='Fußzeile'
			>
				<Link
					href={nav.navlogolink} // TODO: besser lösung für link? damit
					aria-label='Zur Startseite'
					className=' h-full w-fit aspect-square'
				>
					<SanityImage
						src={imgAssets}
						className='object-contain relative'
						// The crucial part for performance:
						sizes='(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw'
						fill
						alt='ki360 Logo'
					/>
				</Link>

				<ul
					className='hidden md:flex gap-15 '
					role='list'
				>
					{nav.items.map((link: NavLink) => {
						return (
							<li
								key={link.text}
								className='flex flex-col'
							>
								<TextLink
									className={`hover:text-[var(--color-granite)] focus:underline-2 focus:underline-offset-2 text-[var(--color-frost)]`}
									href={link.url}
									text={link.text}
								/>
								<TextLink
									className={`hover:text-[var(--color-granite)] focus:underline-2 focus:underline-offset-2 text-[var(--color-frost)]`}
									href={link.url}
									text={link.text}
								/>
								<TextLink
									className={`hover:text-[var(--color-granite)] focus:underline-2 focus:underline-offset-2 text-[var(--color-frost)]`}
									href={link.url}
									text={link.text}
								/>
								<TextLink
									className={`hover:text-[var(--color-granite)] focus:underline-2 focus:underline-offset-2 text-[var(--color-frost)]`}
									href={link.url}
									text={link.text}
								/>
							</li>
						)
					})}
				</ul>
				{/* <MobileNav
					links={nav.items}
					className='flex md:hidden'
				/> */}
			</footer>
		</>
	)
}
