import Silk from '../../components/Silk'
import {
	CurvedCarousel,
	VerticalCarousel,
} from '@/components/custom/carousel/Carousel'
import { Suspense } from 'react'
import { client } from '@/lib/sanity/client'
import { basicsOverviewQuery } from '@/lib/sanity/queries'
import { CarouselData } from '@/components/custom/carousel/types'
export default async function Page() {
	const content = await client.fetch(basicsOverviewQuery)
	const carouselData: CarouselData = content.imgList
	return (
		<div className='overflow-hidden! min-h-screen lg:max-h-screen fixed! w-full wrapper-cols-12 bg-(--color-glossyBlack)'>
			<Silk
				speed={5}
				scale={1}
				color='#F3EFE3'
				noiseIntensity={1.5}
				rotation={0}
				className='lg:hidden'
			/>
			{/* phone: titel fest und bilder scrollen 'untendrunter durch' */}
			<h2 className='w-full relative z-10! h-fit mt-[0.9em] lg:mt-[0.6em] text-center col-span-12 text-(--color-softLinen)'>
				{content.title}
			</h2>
			{/* TODO: add eaiting for loading -> skeleton oder so */}
			<Suspense fallback={<div>Loading...</div>}>
				<CurvedCarousel
					carouselData={carouselData}
					className='hidden lg:flex col-span-12 -mx-20 height-[100vh]'
				/>
			</Suspense>

			<div className='lg:hidden top-40 col-span-12 h-fit w-full flex items-center'>
				<VerticalCarousel carouselData={carouselData} />
			</div>
		</div>
	)
}
