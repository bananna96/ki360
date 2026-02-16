import TiltedCard from '@/components/TiltedCard'

export default function Page() {
	return (
		<div className='h-full overflow-hidden! w-full flex items-center justify-center'>
			<div className='py-[5em]! w-full bg-(--color-frost) wrapper-cols-12'>
				<div className='h-[30vh] col-span-5'>
					<TiltedCard
						imageSrc='https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58'
						altText='Kendrick Lamar - GNX Album Cover'
						captionText='Kendrick Lamar - GNX'
						containerHeight='100%'
						containerWidth='100%'
						imageHeight='100%'
						imageWidth='100%'
						rotateAmplitude={12}
						scaleOnHover={1.05}
						showMobileWarning={false}
						displayOverlayContent
						showTooltip={false}
						overlayContent={
							<p className='tilted-card-demo-text'>Kendrick Lamar - GNX</p>
						}
					/>
				</div>
				<div className='h-[30vh] col-span-7'>
					<TiltedCard
						imageSrc='https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58'
						altText='Kendrick Lamar - GNX Album Cover'
						captionText='Kendrick Lamar - GNX'
						containerHeight='100%'
						containerWidth='100%'
						imageHeight='100%'
						imageWidth='100%'
						rotateAmplitude={12}
						scaleOnHover={1.05}
						showMobileWarning={false}
						displayOverlayContent
						showTooltip={false}
						overlayContent={
							<p className='tilted-card-demo-text'>Kendrick Lamar - GNX</p>
						}
					/>
				</div>
				<div className='h-[30vh] col-span-7'>
					<TiltedCard
						imageSrc='https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58'
						altText='Kendrick Lamar - GNX Album Cover'
						captionText='Kendrick Lamar - GNX'
						containerHeight='100%'
						containerWidth='100%'
						imageHeight='100%'
						imageWidth='100%'
						rotateAmplitude={12}
						scaleOnHover={1.05}
						showMobileWarning={false}
						displayOverlayContent
						showTooltip={false}
						overlayContent={
							<p className='tilted-card-demo-text'>Kendrick Lamar - GNX</p>
						}
					/>
				</div>
				<div className='h-[30vh] col-span-5'>
					<TiltedCard
						imageSrc='https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58'
						altText='Kendrick Lamar - GNX Album Cover'
						captionText='Kendrick Lamar - GNX'
						containerHeight='100%'
						containerWidth='100%'
						imageHeight='100%'
						imageWidth='100%'
						rotateAmplitude={12}
						scaleOnHover={1.05}
						showMobileWarning={false}
						displayOverlayContent
						showTooltip={false}
						overlayContent={
							<p className='tilted-card-demo-text'>Kendrick Lamar - GNX</p>
						}
					/>
				</div>
			</div>
		</div>
	)
}
