'use client'

import { useRef, useState } from 'react'
import CardSwap, { Card, CardSwapRef } from '@/components/CardSwap'
import { IconButton } from '@/components/ui/button'
import { SanityImage } from '../SanityImage'

export interface PromptingSliderType {
	tip: {
		title: string
		description: string
	}
	bullets: string[]
	example: string
	image: {
		asset: {
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
		}
		alt: string
	}
}

export function PromptSlider({
	slidesContent,
}: {
	slidesContent: PromptingSliderType[]
}) {
	const [index, setIndex] = useState(0)
	const [animating, setAnimating] = useState(false)
	const [buttonsDisabled, setButtonsDisabled] = useState(false)
	const [direction, setDirection] = useState<'left' | 'right'>('right')
	const cardSwapRef = useRef<CardSwapRef>(null)

	if (!slidesContent?.length) return null

	const handlePrev = () => {
		if (buttonsDisabled || cardSwapRef.current?.isAnimating()) return

		setButtonsDisabled(true)
		setAnimating(true)
		setDirection('left')
		cardSwapRef.current?.swapPrev()

		setTimeout(() => {
			setIndex((i) => (i - 1 + slidesContent.length) % slidesContent.length)
			setAnimating(false)
		}, 500)

		setTimeout(() => setButtonsDisabled(false), 1500)
	}

	const handleNext = () => {
		if (buttonsDisabled || cardSwapRef.current?.isAnimating()) return

		setButtonsDisabled(true)
		setAnimating(true)
		setDirection('right')
		cardSwapRef.current?.swapNext()

		setTimeout(() => {
			setIndex((i) => (i + 1) % slidesContent.length)
			setAnimating(false)
		}, 500)

		setTimeout(() => setButtonsDisabled(false), 1500)
	}

	const currentSlide = slidesContent[index]

	return (
		<div className='w-full max-w-350 mx-auto overflow-hidden'>
			<div className='flex flex-col lg:flex-row items-start gap-8 lg:gap-12'>
				<div className='w-full lg:w-1/2 relative overflow-hidden flex flex-col items-center mt-10'>
					<div className='flex justify-evenly gap-8 w-full'>
						<IconButton
							onClick={handlePrev}
							iconSize={40}
							ariaLabel='Zurück'
							icon='chevron-left-rounded'
							iconColor='#492e19'
							hoverIconColor='#db761c'
							variant='ghost'
							disabled={buttonsDisabled}
						/>
						<span className='bg-(--color-granite) rounded-2xl w-10 h-10 flex items-center justify-center text-(--color-softLinen) font-bold'>
							{index + 1}
						</span>
						<IconButton
							onClick={handleNext}
							iconSize={40}
							ariaLabel='Weiter'
							icon='chevron-left-rounded'
							iconColor='#492e19'
							hoverIconColor='#db761c'
							variant='ghost'
							className='rotate-180'
							disabled={buttonsDisabled}
						/>
					</div>

					<div
						className={`
                            px-2 sm:px-6 lg:px-10 mt-10 flex flex-col gap-2
                            transition-all duration-500
                            ${
															animating
																? direction === 'right'
																	? 'translate-x-12 sm:translate-x-20 opacity-0'
																	: '-translate-x-12 sm:-translate-x-20 opacity-0'
																: 'translate-x-0 opacity-100'
														}
                        `}
					>
						<h3 className='mb-1 text-center'>{currentSlide.tip.title}</h3>
						<p className='text-justify'>{currentSlide.tip.description}</p>
						<ul className='list-disc ml-6 mb-2'>
							{currentSlide.bullets.map((b, i) => (
								<li key={i}>{b}</li>
							))}
						</ul>
						<p className='font-bold text-justify'>{currentSlide.example}</p>
					</div>

					<div className='relative w-full h-[34vh] sm:h-[42vh] mt-6 lg:hidden'>
						<SanityImage
							src={currentSlide.image.asset.url}
							className='object-cover rounded-lg'
							fill
							alt={currentSlide.image.alt}
							sizes='100vw'
							placeholder={
								currentSlide.image.asset.metadata?.lqip ? 'blur' : 'empty'
							}
							blurDataURL={currentSlide.image.asset.metadata?.lqip}
						/>
					</div>
				</div>

				<div className='hidden lg:block w-full lg:w-1/2 min-w-0 overflow-hidden'>
					<div className='relative w-full h-[70vh]'>
						<CardSwap
							ref={cardSwapRef}
							cardDistance={80}
							verticalDistance={60}
							delay={0}
							pauseOnHover={false}
						>
							{slidesContent.map((slide, i) => (
								<Card key={i}>
									<SanityImage
										src={slide.image.asset.url}
										className='object-cover rounded-lg'
										fill
										alt={slide.image.alt}
										sizes='50vw'
										placeholder={
											slide.image.asset.metadata?.lqip ? 'blur' : 'empty'
										}
										blurDataURL={slide.image.asset.metadata?.lqip}
									/>
								</Card>
							))}
						</CardSwap>
					</div>
				</div>
			</div>
		</div>
	)
}
