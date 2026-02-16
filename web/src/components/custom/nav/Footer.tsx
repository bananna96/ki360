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
				className='bg-[var(--color-glossyBlack)] flex flex-col md:flex-row justify-between p-3'
				aria-label='Fußzeile'
			>
				<Link
					href={nav.navlogolink} // TODO: besser lösung für link? damit
					aria-label='Zur Startseite'
					className='h-full max-w-[30vw] w-full lg:w-fit aspect-square p-5'
				>
					<SanityImage
						src={imgAssets}
						className='object-contain relative! hidden'
						// The crucial part for performance:
						sizes='(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw'
						fill
						alt='ki360 Logo'
					/>
				</Link>

				<ul
					className='max-w-screen-xl w-full px-4 sm:px-6  text-gray-800 flex flex-wrap  justify-center lg:justify-between'
					role='list'
				>
					{nav.items.map((link: NavLink) => {
						return (
							<li
								key={link.text}
								className='p-5'
							>
								<span className='text-[var(--color-frost)] font-bold'>
									{link.text}
								</span>
								<TextLink
									className={`my-3 block hover:text-[var(--color-granite)] focus:underline-2 focus:underline-offset-2 text-[var(--color-frost)]`}
									href={link.url}
									text={link.text}
								/>
								<TextLink
									className={`my-3 block hover:text-[var(--color-granite)] focus:underline-2 focus:underline-offset-2 text-[var(--color-frost)]`}
									href={link.url}
									text={link.text}
								/>
								<TextLink
									className={`my-3 block hover:text-[var(--color-granite)] focus:underline-2 focus:underline-offset-2 text-[var(--color-frost)]`}
									href={link.url}
									text={link.text}
								/>
								<TextLink
									className={`my-3 block hover:text-[var(--color-granite)] focus:underline-2 focus:underline-offset-2 text-[var(--color-frost)]`}
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
