import type { Metadata } from 'next'
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
import { IconButton } from '@/components/ui/button'
import { Suspense } from 'react'
import { ReadButton } from '@/components/custom/ReadBtn'
import { TextLink } from '@/components/custom/Link'
import { TechMethodDrawerCard } from '@/components/custom/TechMethodDrawerCard'

export const revalidate = 3600

export const metadata: Metadata = {
	title: 'Technische Methodiken | KI360',
	description:
		'Technische Methodiken der Künstlichen Intelligenz verständlich erklärt – mit interaktiven Karten und eingebetteten Beispielen.',
}

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

const getOptimizedImageUrl = (asset: SanityImageAsset, span: number) => {
	const widthBySpan: Record<number, number> = {
		4: 900,
		5: 1200,
		7: 1600,
	}

	const url = new URL(asset.url)
	url.searchParams.set('auto', 'format')
	url.searchParams.set('q', '72')
	url.searchParams.set('w', String(widthBySpan[span] ?? 1200))
	url.searchParams.set('fit', 'crop')

	return url.toString()
}

export default async function Page() {
	const content = await client.fetch<TechMethodsContent>(techMethodsQuery)

	return (
		<div className='h-full w-full flex items-center justify-center'>
			<div className='py-[6em] w-full bg-(--color-frost) wrapper-cols-12'>
				{content.items.map((item, index) => {
					const span = index === 0 ? 5 : index === 1 ? 7 : 4

					return (
						<TechMethodDrawerCard
							key={index}
							itemTitle={item.itemTitle}
							subtitle={item.subtitle}
							link={item.link}
							imageSrc={getOptimizedImageUrl(item.image.asset, span)}
							imageAlt={item.image.alt}
							colSpanClass={getColSpan(span)}
						/>
					)
				})}
			</div>
		</div>
	)
}
