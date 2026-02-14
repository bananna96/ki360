import ScrollCarousel from '@/components/custom/ScrollCarousel'

import OrbitImages from '../../components/OrbitImages'

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
		<div className='h-screen lg:h-fit w-full wrapper-cols-12 bg-[var(--color-granite)]'>
			<h2 className='h-10 mt-[3em] text-center col-span-12'>Grundlagen</h2>
			<ScrollCarousel
				items={[
					<div>Item 1</div>,
					<div>Item 2</div>,
					<div>Item 3</div>,
					<div>Item 4</div>,
					<div>Item 5</div>,
					<div>Item 6</div>,
					// ...
				]}
				className='hidden lg:grid col-span-12 overflow-hidden! z-10 -mx-20'
			/>
			<OrbitImages
				images={images}
				shape='ellipse'
				radiusX={500}
				radiusY={700}
				rotation={-8}
				duration={30}
				itemSize={300}
				responsive={true}
				radius={200}
				direction='normal'
				fill
				showPath
				paused={false}
				className='col-span-12 h-full lg:hidden '
			/>
		</div>
	)
}
