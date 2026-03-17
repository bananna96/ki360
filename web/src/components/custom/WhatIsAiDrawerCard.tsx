'use client'

import { useRef, useState } from 'react'
import { SanityImage } from '@/components/SanityImage'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Button, IconButton } from '@/components/ui/button'
import { ReadButton } from '@/components/custom/ReadBtn'

type OverlayItem = {
	itemTitle: string
	subtitle: string
}

type Props = {
	itemTitle: string
	subtitle: string
	imageSrc: string
	imageAlt: string
	imageBlurDataURL?: string
	overlayTitle?: string
	overlayItems?: OverlayItem[]
}

export function WhatIsAiDrawerCard({
	itemTitle,
	subtitle,
	imageSrc,
	imageAlt,
	imageBlurDataURL,
	overlayTitle,
	overlayItems,
}: Props) {
	const [open, setOpen] = useState(false)
	const scrollYRef = useRef(0)

	function handleOpen(isOpen: boolean) {
		if (isOpen) {
			scrollYRef.current = window.scrollY
		} else {
			requestAnimationFrame(() => {
				window.scrollTo({ top: scrollYRef.current, behavior: 'instant' })
			})
		}
		setOpen(isOpen)
	}

	const fullOverlayText = overlayItems
		?.map((ovItem) => `${ovItem.itemTitle}. ${ovItem.subtitle}`)
		.join('. ')

	return (
		<Drawer
			open={open}
			onOpenChange={handleOpen}
			shouldScaleBackground={false}
			setBackgroundColorOnScale={false}
		>
			<DrawerTrigger asChild>
				<Button
					type='button'
					variant='ghost'
					aria-label={`${itemTitle} öffnen`}
					className='h-auto w-full rounded-lg p-0 text-left hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
				>
					<div className='w-full max-w-[320px] mx-auto flex flex-col items-center cursor-pointer group'>
						<h5 className='text-lg md:text-xl text-center'>{itemTitle}</h5>
						<p className='text-sm md:text-base text-center'>{subtitle}</p>
						<div className='relative w-full aspect-square mt-4 overflow-hidden rounded-lg'>
							<SanityImage
								src={imageSrc}
								alt={imageAlt}
								fill
								className='object-cover transition-transform duration-600 group-hover:scale-120'
								sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px'
								placeholder={imageBlurDataURL ? 'blur' : 'empty'}
								blurDataURL={imageBlurDataURL}
							/>
							<div
								aria-hidden='true'
								className='pointer-events-none absolute inset-0 flex items-center justify-center lg:hidden'
							>
								<span className='inline-flex items-center rounded-xs bg-(--color-softLinen)/90 px-4 py-2 text-md'>
									Mehr
								</span>
							</div>
						</div>
					</div>
				</Button>
			</DrawerTrigger>

			<DrawerContent className='px-4 md:px-8 pb-8 max-h-[80svh] will-change-transform flex flex-col'>
				<DrawerHeader className='relative z-10 shrink-0 px-4 sm:px-6 md:px-10 flex flex-row justify-between items-center gap-2 sm:gap-4'>
					<ReadButton
						text={fullOverlayText ?? subtitle}
						className='w-8 h-8 sm:w-10 sm:h-10 shrink-0'
					/>
					<DrawerTitle
						asChild
						className='text-2xl sm:text-4xl md:text-4xl leading-none text-center flex-1'
					>
						<h3>{overlayTitle ?? itemTitle}</h3>
					</DrawerTitle>
					<DrawerClose asChild>
						<IconButton
							icon='cancel'
							ariaLabel='Schließen'
							iconColor='#db761c'
							iconSize={36}
							variant='ghost'
							size='icon'
							className='relative z-20 shrink-0 touch-manipulation pointer-events-auto'
							data-vaul-no-drag
						/>
					</DrawerClose>
				</DrawerHeader>

				<DrawerDescription className='shrink-0 px-4 md:px-20 text-sm text-center'>
					{subtitle}
				</DrawerDescription>

				<div className='mt-4 px-4 md:px-20 pb-6 grid gap-4 flex-1 min-h-0 overflow-y-auto [-webkit-overflow-scrolling:touch] overscroll-contain [touch-action:pan-y]'>
					{overlayItems?.map((ovItem, ovIndex) => (
						<div key={ovIndex}>
							<h5 className='text-base md:text-lg font-bold'>
								{ovItem.itemTitle}
							</h5>
							<p className='text-sm text-justify'>{ovItem.subtitle}</p>
						</div>
					))}
				</div>
			</DrawerContent>
		</Drawer>
	)
}
