'use client'
import { useRef, useState } from 'react'
import CardSwap, { Card, CardSwapRef } from '@/components/CardSwap'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/custom/Icons'
import { SanityImage } from '../SanityImage'
import { urlForImage } from '@/lib/sanity/utils'

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
}

export function PromptSlider({
	slidesContent,
}: {
	slidesContent: PromptingSliderType[]
}) {
	const [index, setIndex] = useState(0)
	const [animating, setAnimating] = useState(false)
	const [buttonsDisabled, setButtonsDisabled] = useState(false) // NEU
	const [direction, setDirection] = useState<'left' | 'right'>('right')
	const cardSwapRef = useRef<CardSwapRef>(null)

	const handlePrev = () => {
		if (buttonsDisabled || cardSwapRef.current?.isAnimating()) return
		if (!cardSwapRef.current) return

		setButtonsDisabled(true)
		setAnimating(true)
		setDirection('left')

		cardSwapRef.current.swapPrev()

		// Text-Animation
		setTimeout(() => {
			setIndex((i) => (i - 1 + slidesContent.length) % slidesContent.length)
			setAnimating(false)
		}, 500)

		// Button-Sperre
		setTimeout(() => {
			setButtonsDisabled(false)
		}, 1500)
	}
	const handleNext = () => {
		if (buttonsDisabled || cardSwapRef.current?.isAnimating()) return
		if (!cardSwapRef.current) return

		setButtonsDisabled(true)
		setAnimating(true)
		setDirection('right')

		cardSwapRef.current.swapNext()

		// Text-Animation
		setTimeout(() => {
			setIndex((i) => (i + 1) % slidesContent.length)
			setAnimating(false)
		}, 500)

		// Button-Sperre
		setTimeout(() => {
			setButtonsDisabled(false)
		}, 1500)
	}

	return (
		<>
			<div className='w-screen h-[70vh] pl-40 flex justify-between'>
				<div className='w-[50%] relative overflow-hidden flex flex-col items-center mt-3'>
					<span className='bg-(--color-granite) rounded-2xl w-10 h-10 flex items-center justify-center text-(--color-softLinen) font-bold'>
						{index + 1}
					</span>
					<div className='flex justify-evenly w-full'>
						{/* TODO: replace buttons, und button group hinzufügen? */}
						<Button
							onClick={handlePrev}
							aria-label='Zurück'
							variant='ghost'
							className='w-fit h-fit hover:bg-transparent'
							disabled={buttonsDisabled}
						>
							<Icon
								name='chevron-left-rounded'
								color='#492e19'
								className='w-8! h-8!'
							/>
						</Button>
						<Button
							onClick={handleNext}
							aria-label='Weiter'
							variant='ghost'
							className='w-fit h-fit hover:bg-transparent'
							disabled={buttonsDisabled}
						>
							<Icon
								name='chevron-left-rounded'
								color='#492e19'
								className='w-8! h-8! rotate-180'
							/>
						</Button>
					</div>
					<div
						className={`
							px-10 flex flex-col gap-2 max-h-[50vh]
							transition-all duration-500
							${
								animating
									? direction === 'right'
										? 'translate-x-32 opacity-0'
										: '-translate-x-32 opacity-0'
									: 'translate-x-0 opacity-100'
							}
						`}
					>
						<h3 className='mb-1 text-center'>
							{slidesContent[index].tip.title}
						</h3>
						<p className='text-justify'>
							{slidesContent[index].tip.description}
						</p>
						<ul className='list-disc ml-6 mb-2'>
							{slidesContent[index].bullets.map((b, i) => (
								<li key={i}>{b}</li>
							))}
						</ul>
						<p className='font-bold text-justify'>
							{slidesContent[index].example}
						</p>
					</div>
				</div>
				<div className='h-[70vh] relative'>
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
									src={urlForImage(slide.image.asset)}
									className='object-cover rounded-lg'
									fill
									alt={slide.image.alt}
								/>
							</Card>
						))}
					</CardSwap>
				</div>
			</div>
		</>
	)
}
