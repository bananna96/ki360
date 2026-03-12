import { client } from '@/lib/sanity/client'
import { navQuery } from '@/lib/sanity/queries'
import Link from 'next/link'
import { TextLink } from '../Link'
import type { NavLink } from './types'
import { urlForImage } from '@/lib/sanity/utils'
import { SanityImage } from '@/components/SanityImage'

export default async function Footer() {
	const nav = await client.fetch(navQuery)

	const logo = nav.footerlogo ?? nav.navlogo
	const footerImgAssets = urlForImage(logo.asset)

	const logoWidth = logo?.asset?.metadata?.dimensions?.width ?? 240
	const logoHeight = logo?.asset?.metadata?.dimensions?.height ?? 80

	return (
		<footer
			className='bg-(--color-glossyBlack) p-3 md:flex md:flex-row md:items-start md:justify-between md:gap-6'
			aria-label='Fußzeile'
		>
			<div className='grid grid-cols-2 md:contents'>
				<Link
					href={nav.navlogolink}
					aria-label='Zur Startseite'
					className='col-span-1 shrink-0 w-30 sm:w-35 md:w-47.5'
				>
					<SanityImage
						src={footerImgAssets}
						alt={logo?.alt ?? 'ki360 Logo'}
						width={logoWidth}
						height={logoHeight}
						className='w-full h-auto object-contain'
					/>
				</Link>

				<ul
					className='col-span-1 flex flex-col text-right max-w-8xl md:w-full md:px-4 md:flex-wrap md:flex-row md:justify-between md:text-left'
					role='list'
				>
					{nav.items.map((link: NavLink) => (
						<li
							key={link.text}
							className='pb-3 md:p-5 min-w-45'
						>
							{link.url ? (
								<TextLink
									className='block text-(--color-frost) font-bold hover:text-(--color-granite) focus:underline-2 focus:underline-offset-2'
									href={link.url}
									text={link.text}
								/>
							) : (
								<span className='block text-(--color-frost) font-bold'>
									{link.text}
								</span>
							)}

							{link.subitems?.length ? (
								<ul
									className='md:mt-3 space-y-2'
									role='list'
								>
									{link.subitems.map((subitem) => (
										<li key={`${link.text}-${subitem.text}`}>
											<TextLink
												className='block text-(--color-frost) hover:text-(--color-granite) focus:underline-2 focus:underline-offset-2'
												href={subitem.url}
												text={subitem.text}
											/>
										</li>
									))}
								</ul>
							) : null}
						</li>
					))}
				</ul>
			</div>
		</footer>
	)
}
