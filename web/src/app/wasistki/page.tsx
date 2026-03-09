export const revalidate = 3600 // 3600 seconds = 1 hour, 86400 seconds = 1 day, 604800 seconds = 1 week
import { client } from '@/lib/sanity/client'
import { whatIsAiQuery } from '@/lib/sanity/queries'
import { SanityImage } from '@/components/SanityImage'
import { urlForImage } from '@/lib/sanity/utils'
import { Suspense } from 'react'
import Link from 'next/link'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/custom/Icons'

interface SanityImageAsset {
	_id: string
	url: string
	metadata: {
		lqip: string
		dimensions: {
			width: number
			height: number
			aspectRatio: number
		}
	}
	[key: string]: any
}

interface SanityImage {
	asset: SanityImageAsset
	alt: string
	hotspot?: {
		x: number
		y: number
		height: number
		width: number
	}
	crop?: {
		top: number
		bottom: number
		left: number
		right: number
	}
}

interface Link {
	text: string
	url: string
}

interface WhatIsAiContent {
	section1: {
		title: string
		description: string
		image: SanityImage
	}
	section2: Link
	section3: {
		title: string
		items: {
			itemTitle: string
			subtitle: string
			link: Link
			image: SanityImage
		}[]
	}
	section4: {
		title: string
		items: {
			title: string
			description: string
			image: SanityImage
		}[]
	}
	section5: {
		title: string
		items: {
			itemTitle: string
			subtitle: string
			link: Link
			image: SanityImage
		}[]
		overlayText: {
			title: string
			items: {
				itemTitle: string
				subtitle: string
				link: Link
				image: SanityImage
			}[]
		}[]
	}
}

export default async function Page() {
	const content = await client.fetch<WhatIsAiContent>(whatIsAiQuery)
	console.log(content.section5)
	const sec1Img = urlForImage(content.section1.image.asset)

	const getImageUrl = (asset: SanityImageAsset): string => urlForImage(asset)
	return (
		<div className='flex flex-col'>
			{/* SECTION 1 */}
			<div className='min-h-screen w-full  wrapper-cols-12'>
				<div className='col-span-7 flex flex-col justify-end gap-4 pb-10'>
					<h4>{content.section1.title}</h4>
					<span>{content.section1.description}</span>
				</div>
				<div className='col-start-9 col-end-13 relative -mr-20 h-screen'>
					<SanityImage
						src={sec1Img}
						className='object-cover'
						fill
						alt={content.section1.image.alt}
					/>
				</div>
			</div>
			{/* SECTION 2 */}
			<div className='min-h-screen w-full items-end  wrapper-cols-12 bg-(--color-granite)'>
				<Suspense fallback={<p>Loading video...</p>}>
					<iframe
						src={content.section2.url}
						title={content.section2.text}
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						referrerPolicy='strict-origin-when-cross-origin'
						allowFullScreen
						className='w-screen h-screen -ml-20 object-contain'
					/>
				</Suspense>
			</div>
			{/* SECTION 3 */}
			<div className='min-h-screen w-full  wrapper-cols-12 bg-(--color-frost)'>
				<div className='col-span-full flex flex-col justify-center text-(--color-glossyBlack)'>
					<h3>{content.section3.title}</h3>
					<div className='flex justify-between'>
						{content.section3.items.map((item, index) => (
							<div
								key={index}
								className='relative w-[30%] h-100 flex flex-col justify-start items-center mt-20'
							>
								<h5>{item.itemTitle}</h5>
								<span>{item.subtitle}</span>
								<div className='relative mt-10'>
									<SanityImage
										src={getImageUrl(item.image.asset)}
										alt={item.image.alt ?? 'Image' + index}
										className='object-contain'
										width={150}
										height={150}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			{/* SECTION 4 */}
			<div className='min-h-screen w-full items-end bg-(--color-granite)'>
				<div className='col-span-full flex flex-col text-(--color-softLinen) gap-10 justify-center'>
					<h3 className='w-full text-center'>{content.section4.title}</h3>
				</div>
				{content.section4.items.map((item, index) => {
					return (
						<div
							key={index}
							className=''
						>
							<h5 className='w-full!'>{item.title}</h5>
							<p>{item.description}</p>
						</div>
					)
				})}
			</div>
			{/* SECTION 5 */}
			<div className='min-h-screen w-full wrapper-cols-12 bg-(--color-frost)'>
				<div className='h-fit! col-span-full gap-10 mt-40 '>
					<h3>{content.section5.title}</h3>
				</div>
				<div className='flex justify-between items-start col-span-full pb-10 gap-4'>
					{content.section5.items.map((item, index) => {
						const card = (
							<div className='flex flex-col items-center cursor-pointer'>
								<h5>{item.itemTitle}</h5>
								<p>{item.subtitle}</p>
								<div className='relative w-80 h-80 mt-4'>
									<SanityImage
										src={getImageUrl(item.image.asset)}
										alt={item.image.alt ?? 'Image' + index}
										fill
										className='object-cover'
									/>
								</div>
							</div>
						)
						if (index === 0) {
							return (
								<Link
									key={index}
									href={item.link?.url || '/'}
									aria-label={item.itemTitle}
								>
									{card}
								</Link>
							)
						}
						const overlay = content.section5.overlayText[index - 1]
						return (
							<Drawer key={index}>
								<DrawerTrigger asChild>{card}</DrawerTrigger>
								<DrawerContent className='px-8'>
									<DrawerClose asChild>
										<Icon
											name='cancel'
											color='#db761c'
											className='w-12! h-12! self-end'
										/>
									</DrawerClose>

									<DrawerHeader className='px-20 pt-0'>
										<DrawerTitle className='text-[8em]'>
											{overlay?.title ?? item.itemTitle}
										</DrawerTitle>
										<DrawerDescription>{item.subtitle}</DrawerDescription>
									</DrawerHeader>

									<div className='px-20 pb-6 grid gap-4 overflow-y-auto'>
										{overlay?.items?.map((ovItem, ovIndex) => (
											<div key={ovIndex}>
												<h5>{ovItem.itemTitle}</h5>
												<p>{ovItem.subtitle}</p>
											</div>
										))}
									</div>

									<DrawerFooter></DrawerFooter>
								</DrawerContent>
							</Drawer>
						)
					})}
				</div>
			</div>
		</div>
	)
}
