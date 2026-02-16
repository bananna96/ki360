'use client'
import { useRef, useState } from 'react'
import styles from './PromptSlider.module.css' // siehe unten
import CardSwap, { Card, CardSwapRef } from '@/components/CardSwap'

const slides = [
	{
		image: '/img1.jpg',
		title: 'Präzision',
		text: 'Je mehr Informationen ...',
		bullets: [
			'Was ist die Aufgabe?',
			'Was ist das Ziel?',
			'Wie ist der Ton und Stil?',
			'Was ist der gewünschte Output?',
		],
		example: 'Anstatt zu fragen: ...',
	},
	{
		image: '/img1.jpg',
		title: 'Präzision',
		text: 'Je mehr Informationen ...',
		bullets: [
			'Was ist die Aufgabe?',
			'Was ist das Ziel?',
			'Wie ist der Ton und Stil?',
			'Was ist der gewünschte Output?',
		],
		example: 'Anstatt zu fragen: ...',
	},
	{
		image: '/img1.jpg',
		title: 'Präzision',
		text: 'Je mehr Informationen ...',
		bullets: [
			'Was ist die Aufgabe?',
			'Was ist das Ziel?',
			'Wie ist der Ton und Stil?',
			'Was ist der gewünschte Output?',
		],
		example: 'Anstatt zu fragen: ...',
	},
	// ...weitere Slides
]

export default function PromptSlider() {
	const [index, setIndex] = useState(0)
	const [direction, setDirection] = useState<'left' | 'right'>('right')
	const [animating, setAnimating] = useState(false)

	// TODO: Ref beste lösung?
	const handlePrev = () => {
		cardSwapRef.current?.swapPrev()
		if (animating) return
		setDirection('left')
		setAnimating(true)
		setTimeout(() => {
			setIndex((i) => (i - 1 + slides.length) % slides.length)
			setAnimating(false)
		}, 500)
	}
	const handleNext = () => {
		cardSwapRef.current?.swapNext()
		if (animating) return
		setDirection('right')
		setAnimating(true)
		setTimeout(() => {
			setIndex((i) => (i + 1) % slides.length)
			setAnimating(false)
		}, 500)
	}

	const cardSwapRef = useRef<CardSwapRef>(null)

	return (
		<>
			<div className='mt-20 w-screen flex flex-col justify-center items-center'>
				<h3>Tipps & Tricks</h3>
				<span>für gutes prompten</span>
			</div>
			<div className='w-screen h-[70vh] pl-40 flex justify-between'>
				{/* Text mit Slide-Animation */}
				<div className='w-[50%] relative overflow-hidden flex flex-col items-center'>
					{/* TODO: replace buttons, und button group hinzufügen? */}
					<span className='bg-(--color-granite) rounded-xl w-10 h-10 text-center text-(--color-softLinen) font-bold '>
						{index + 1}
					</span>
					<div className='flex justify-evenly w-full'>
						<button
							onClick={handlePrev}
							aria-label='Zurück'
							className='rounded-full bg-brown-200 w-10 text-2xl'
						>
							←
						</button>
						<button
							onClick={handleNext}
							aria-label='Weiter'
							className='rounded-full bg-brown-200 w-10 text-2xl'
						>
							→
						</button>
					</div>
					<div
						key={index}
						className={`
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
						<h2 className='text-2xl font-bold mb-2 text-center'>
							{slides[index].title}
						</h2>
						<ul className='list-disc ml-6 mb-2'>
							{slides[index].bullets.map((b, i) => (
								<li key={i}>{b}</li>
							))}
						</ul>
						<p className='mb-2'>{slides[index].text}</p>
						<p className='font-bold'>Beispiel: {slides[index].example}</p>
					</div>
				</div>
				<div className='h-[70vh] relative'>
					<CardSwap
						ref={cardSwapRef}
						cardDistance={70}
						verticalDistance={70}
						delay={0}
						pauseOnHover={false}
					>
						<Card>
							<h3>Card 1</h3>
							<p>Your content here</p>
						</Card>
						<Card>
							<h3>Card 2</h3>
							<p>Your content here</p>
						</Card>
						<Card>
							<h3>Card 3</h3>
							<p>Your content here</p>
						</Card>
					</CardSwap>
				</div>
			</div>
		</>
	)
}
