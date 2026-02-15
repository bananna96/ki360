import InfiniteImgLoop from '../InfiniteImgLoop'

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

function Carousel({ className }: { className?: string }) {
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

export default Carousel
