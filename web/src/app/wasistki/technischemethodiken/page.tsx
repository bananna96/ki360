import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { techMethodsQuery } from '@/lib/sanity/queries'
import { TechMethodDrawerCard } from '@/components/custom/TechMethodDrawerCard'
import { Breadcrumbs } from '@/components/custom/Breadcrumbs'

export const revalidate = 3600

export const metadata: Metadata = {
	title: 'Technische Methodiken | KI360',
	description:
		'Technische Methodiken der Künstlichen Intelligenz verständlich erklärt – mit interaktiven Karten und eingebetteten Beispielen.',
}

type SanityImageAsset = {
	_id: string
	url: string
	metadata: {
		lqip: string
		dimensions: { width: number; height: number; aspectRatio: number }
	}
}

type TechMethodsContent = {
	title: string
	items: {
		itemTitle: string
		subtitle: string
		link: string
		image: { asset: SanityImageAsset; alt: string }
	}[]
}

const getOptimizedImageUrl = (asset: SanityImageAsset, width: number) => {
	const url = new URL(asset.url)
	url.searchParams.set('auto', 'format')
	url.searchParams.set('q', '72')
	url.searchParams.set('w', String(width))
	url.searchParams.set('fit', 'crop')
	return url.toString()
}

const getColSpanClass = (index: number) => {
	if (index === 0) return 'col-span-1 lg:col-span-5'
	if (index === 1) return 'col-span-1 lg:col-span-7'
	return 'col-span-1 sm:col-span-1 lg:col-span-4'
}

const getImageWidth = (index: number) => {
	if (index === 1) return 1600
	if (index === 0) return 1200
	return 900
}

export default async function Page() {
	const content = await client.fetch<TechMethodsContent>(techMethodsQuery)

	return (
		<div className='min-h-screen w-full bg-(--color-frost) px-4 md:px-10 lg:px-20 pb-16 md:pb-24'>
			<Breadcrumbs className='mb-4 md:mb-6 md:-ml-4! lg:-ml-16! ' />
			<h1 className='text-7xl md:text-9xl lg:text-9xl mb-8 md:mb-12 w-full text-center'>
				{content.title}
			</h1>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-9 lg:gap-4'>
				{content.items.map((item, index) => (
					<TechMethodDrawerCard
						key={index}
						itemTitle={item.itemTitle}
						subtitle={item.subtitle}
						link={item.link}
						imageSrc={getOptimizedImageUrl(
							item.image.asset,
							getImageWidth(index),
						)}
						imageAlt={item.image.alt}
						colSpanClass={getColSpanClass(index)}
					/>
				))}
			</div>
		</div>
	)
}
