import TiltedCard from '@/components/TiltedCard'
import { client } from '@/lib/sanity/client'
import { techMethodsQuery } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/utils'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Icon } from '@/components/custom/Icons'
import { Suspense } from 'react'
import { ReadButton } from '@/components/custom/ReadBtn'
import { TextLink } from '@/components/custom/Link'

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

interface TechMethodsContent {
	title: string
	items: {
		itemTitle: string
		subtitle: string
		link: string
		image: SanityImage
	}[]
}

const getColSpan = (span: number) => {
	const spans: Record<number, string> = {
		4: 'col-span-4',
		5: 'col-span-5',
		7: 'col-span-7',
	}
	return spans[span] || 'col-span-4'
}

export default async function Page() {
	const content = await client.fetch<TechMethodsContent>(techMethodsQuery)
	const getImageUrl = (asset: SanityImageAsset): string => urlForImage(asset)

	return (
		<div className='h-full overflow-hidden! w-full flex items-center justify-center'>
			<div className='py-[6em]! w-full bg-(--color-frost) wrapper-cols-12'>
				{content.items.map((item, index) => {
					const span = index === 0 ? 5 : index === 1 ? 7 : 4

					const card = (
						<div className={`h-[40vh] ${getColSpan(span)} cursor-pointer`}>
							<TiltedCard
								imageSrc={getImageUrl(item.image.asset)}
								altText={item.image.alt}
								captionText={item.itemTitle}
								containerHeight='100%'
								containerWidth='100%'
								imageHeight='100%'
								imageWidth='100%'
								rotateAmplitude={30}
								scaleOnHover={1.05}
								showMobileWarning={false}
								displayOverlayContent
								showTooltip={false}
								overlayContent={
									<p className='tilted-card-demo-text uppercase'>
										{item.itemTitle}
									</p>
								}
							/>
						</div>
					)

					return (
						<Drawer key={index}>
							<DrawerTrigger asChild>{card}</DrawerTrigger>
							<DrawerContent className='px-8 pb-8 border-0 min-h-fit max-h-screen flex flex-col'>
								<DrawerHeader className='px-20 pt-0 flex flex-row justify-between items-start'>
									<ReadButton
										text={item.subtitle}
										className={`w-10! h-10! ${!item.subtitle ? 'invisible pointer-events-none' : ''}`}
									/>
									<DrawerTitle className='text-[8em]'>
										{item.itemTitle}
									</DrawerTitle>
									<DrawerClose aria-label='Schließen'>
										<Icon
											name='cancel'
											color='#db761c'
											size={48}
											className='w-12 h-12 cursor-pointer'
										/>
									</DrawerClose>
								</DrawerHeader>

								{item.link ? (
									<div className='px-40 overflow-hidden flex flex-col justify-center items-center'>
										<iframe
											src={item.link}
											className='w-full  max-h-[70vh]  rounded-xl aspect-video'
											title={item.itemTitle}
											referrerPolicy='strict-origin-when-cross-origin'
											allowFullScreen
										/>
										<TextLink
											className='my-3 block hover:text-(--color-ochre) text-(--color-granite)'
											href={item.subtitle}
											text={item.subtitle}
											openInNewTab
										/>
									</div>
								) : (
									<div className='px-20 shrink-0'>{item.subtitle}</div>
								)}
							</DrawerContent>
						</Drawer>
					)
				})}
			</div>
		</div>
	)
}
