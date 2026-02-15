import Silk from '../../components/Silk'
import Carousel from '@/components/custom/Carousel'
import { Suspense } from 'react'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { basicsOverviewQuery } from '@/lib/sanity/queries'
import Link from 'next/link'
import { SanityImage } from '@/components/SanityImage'
import { urlForImage } from '@/lib/sanity/utils'

export default async function Page() {
	const images = [
		'https://picsum.photos/300/300?grayscale&random=1',
		'https://picsum.photos/300/300?grayscale&random=2',
		'https://picsum.photos/300/300?grayscale&random=3',
		'https://picsum.photos/300/300?grayscale&random=4',
		'https://picsum.photos/300/300?grayscale&random=5',
		'https://picsum.photos/300/300?grayscale&random=6',
	]
	const content = await client.fetch(basicsOverviewQuery)
	console.log('Fetched basics overview content:', content.imgList[0]) // Debugging: Log the fetched content

	return (
		<div className='overflow-auto lg:overflow-hidden min-h-screen lg:max-h-screen fixed! w-full wrapper-cols-12 bg-[var(--color-glossyBlack)]'>
			<Silk
				speed={5}
				scale={1}
				color='#F3EFE3'
				noiseIntensity={1.5}
				rotation={0}
				className='lg:hidden'
			/>
			{/* phone: titel fest und bilder scrollen 'untendrunter durch' */}
			<h2 className='w-full fixed lg:relative z-10! h-fit mt-[0.8em] lg:mt-[0.6em] text-center col-span-12 text-[var(--color-softLinen)]'>
				{content.title}
			</h2>
			<Suspense fallback={<div>Loading...</div>}>
				<Carousel className='hidden lg:flex col-span-12 -mx-20 height-[100vh]' />
			</Suspense>

			<div className='lg:hidden absolute z-1! top-40 col-span-12 h-fit w-full z-10'>
				<div className='flex flex-col gap-4'>
					{content.imgList.map(
						(
							imgItem: {
								alt: string
								asset: any
								link: { url: string; text: string }
							},
							index: number,
						) => {
							const src = urlForImage(imgItem.asset.url) // Assuming urlForImage returns an object with a url() method
							return (
								<Link
									key={index}
									href={imgItem.link.url} // TODO: besser lösung für link? damit
									aria-label='Zur Startseite'
									className='relative max-w-screen text-center'
								>
									<SanityImage
										src={src}
										className='h-[20vh] w-screen object-cover'
										// The crucial part for performance:
										//sizes='(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw'
										width={100}
										height={100}
										alt={imgItem.alt}
										quality={100}
									/>
									<span className='bg-[var(--color-softLinen)]/70 w-1/2 px-3 py-2 text-lg bold absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'>
										{imgItem.link.text}
									</span>
								</Link>
							)
						},
					)}
				</div>
			</div>
		</div>
	)
}
