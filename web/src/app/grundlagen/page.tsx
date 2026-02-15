import Silk from '../../components/Silk'
import Carousel from '@/components/custom/Carousel'
import { Suspense } from 'react'
import Image from 'next/image'

export default function Page() {
	const images = [
		'https://picsum.photos/300/300?grayscale&random=1',
		'https://picsum.photos/300/300?grayscale&random=2',
		'https://picsum.photos/300/300?grayscale&random=3',
		'https://picsum.photos/300/300?grayscale&random=4',
		'https://picsum.photos/300/300?grayscale&random=5',
		'https://picsum.photos/300/300?grayscale&random=6',
	]
	return (
		<div className='overflow-auto min-h-screen lg:max-h-screen fixed w-full wrapper-cols-12 bg-[var(--color-glossyBlack)]'>
			<Silk
				speed={5}
				scale={1}
				color='#F3EFE3'
				noiseIntensity={1.5}
				rotation={0}
				className='lg:hidden'
			/>
			{/* phone: titel fest und bilder scrollen 'untendrunter durch' */}
			<h2 className='w-full fixed lg:relative z-10! h-fit mt-[0.8em] text-center col-span-12 text-[var(--color-softLinen)]'>
				Grundlagen
			</h2>
			<Suspense fallback={<div>Loading...</div>}>
				<Carousel className='hidden lg:flex col-span-12 -mx-20 height-[100vh]' />
			</Suspense>

			<div className='lg:hidden absolute z-1! top-60 col-span-12 min-h-screen h-fit w-full z-10'>
				<div className='flex flex-col gap-4'>
					{images.map((src, index) => (
						<div
							key={index}
							className='relative max-w-screen text-center'
						>
							<Image
								src={src}
								alt={`Image ${index + 1}`}
								className='h-[15vh] w-screen object-cover'
								width={100}
								height={100}
								quality={100}
							/>
							<span className='text-white absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'>
								Thema
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
