import { Card, CardContent } from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { SanityImage } from '@/components/SanityImage'
import { urlForImage } from '@/lib/sanity/utils'

import InfiniteImgLoop from '../../InfiniteImgLoop'
import { CarouselData } from './types'
import Link from 'next/link'
// Alternative with image sources
const imageLogos = [
	{
		src: 'https://picsum.photos/300/300?grayscale&random=1',
		alt: 'Company 1',
		href: 'https://company1.com',
	},
	{
		src: 'https://picsum.photos/300/300?grayscale&random=2',
		alt: 'Company 2',
		href: 'https://company2.com',
	},
	{
		src: 'https://picsum.photos/300/300?grayscale&random=3',
		alt: 'Company 3',
		href: 'https://company3.com',
	},
	{
		src: 'https://picsum.photos/300/300?grayscale&random=4',
		alt: 'Company 4',
		href: 'https://company4.com',
	},
]

function CurvedCarousel({
	className,
	carouselData,
}: {
	className?: string
	carouselData: CarouselData
}) {
	const imageLogos = carouselData.map((item) => ({
		src: item.asset.url,
		alt: item.alt,
		href: item.link.url,
	}))
	return (
		<div className={className}>
			<InfiniteImgLoop
				logos={imageLogos}
				speed={60}
				direction='left'
				logoHeight={400}
				gap={0}
				hoverSpeed={0}
				scaleOnHover
				fadeOut={false}
				fadeOutColor='#ffffff'
				ariaLabel='Unterthemen'
				className=' whitespace-nowrap mask-top mask-size-[150%_90%] mask-[url(/imgs/masks/carousel_mask.png)]'
			/>
		</div>
	)
}

async function VerticalCarousel({
	carouselData,
}: {
	carouselData: CarouselData
}) {
	return (
		<Carousel
			opts={{
				align: 'start',
			}}
			orientation='vertical'
			className='w-full'
		>
			<CarouselContent className='-mt-1 h-[50vh]'>
				{carouselData.map((item: any, index: number) => (
					<CarouselItem
						key={index}
						className='basis-1/2'
					>
						<div>
							<Card className='p-0 overflow-hidden'>
								<CardContent className='p-0 relative'>
									<h5 className='absolute z-1 w-full text-center bg-(--color-softLinen)/70'>
										{item.link.text}
									</h5>
									<Link
										href={item.link.url} // TODO: besser lösung für link? damit
										aria-label='Zur Startseite'
										className='h-full w-fit'
									>
										<SanityImage
											src={urlForImage(item.asset)}
											className='object-cover relative!'
											fill
											alt='ki360 Logo'
										/>
									</Link>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}

export { CurvedCarousel, VerticalCarousel }
