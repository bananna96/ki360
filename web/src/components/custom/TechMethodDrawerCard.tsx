'use client'

import { useState, useRef } from 'react'
import TiltedCard from '@/components/TiltedCard'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { IconButton } from '@/components/ui/button'
import { ReadButton } from '@/components/custom/ReadBtn'
import { TextLink } from '@/components/custom/Link'
import { ConsentVideo } from '@/components/custom/ConsentVideo'

type Props = {
	itemTitle: string
	subtitle: string
	link: string
	imageSrc: string
	imageAlt: string
	colSpanClass: string
}

export function TechMethodDrawerCard({
	itemTitle,
	subtitle,
	link,
	imageSrc,
	imageAlt,
	colSpanClass,
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

	return (
		<Drawer
			open={open}
			onOpenChange={handleOpen}
			shouldScaleBackground={false}
			setBackgroundColorOnScale={false}
		>
			<DrawerTrigger asChild>
				<button
					type='button'
					aria-label={`${itemTitle} öffnen`}
					className={`
                        h-[30vh] sm:h-[35vh] lg:h-[40vh]
                        ${colSpanClass}
                        w-full cursor-pointer text-left rounded-lg
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                    `}
				>
					<TiltedCard
						imageSrc={imageSrc}
						altText={imageAlt}
						captionText={itemTitle}
						containerHeight='100%'
						containerWidth='100%'
						imageHeight='100%'
						imageWidth='100%'
						rotateAmplitude={30}
						scaleOnHover={1.05}
						showMobileWarning={false}
						displayOverlayContent
						showTooltip={false}
						overlayContent={
							<p className='tilted-card-demo-text uppercase'>{itemTitle}</p>
						}
					/>
				</button>
			</DrawerTrigger>

			<DrawerContent className='px-2 sm:px-4 md:px-8 pb-8 border-0 h-auto max-h-[90dvh] overflow-hidden flex flex-col z-[60]'>
				<DrawerHeader className='shrink-0 px-4 sm:px-10 md:px-20 pt-0 flex flex-row justify-between items-start gap-2 sm:gap-4'>
					<ReadButton
						text={subtitle}
						disabled={Boolean(link)}
						className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 ${Boolean(link) ? 'invisible pointer-events-none' : ''}`}
					/>

					<div className='min-w-0 flex-1'>
						<DrawerTitle className='text-2xl sm:text-4xl md:text-6xl lg:text-[5em] leading-none break-words'>
							{itemTitle}
						</DrawerTitle>
						<DrawerDescription className='sr-only'>
							{Boolean(link)
								? `${itemTitle} mit eingebettetem Inhalt`
								: subtitle}
						</DrawerDescription>
					</div>

					<DrawerClose asChild>
						<IconButton
							icon='cancel'
							ariaLabel='Schließen'
							iconColor='#db761c'
							iconSize={48}
							variant='ghost'
							size='icon'
						/>
					</DrawerClose>
				</DrawerHeader>

				<div className='flex-1 min-h-0 overflow-y-auto [-webkit-overflow-scrolling:touch] [overscroll-behavior:contain]'>
					{Boolean(link) ? (
						<div className='px-4 sm:px-10 md:px-20 lg:px-40 flex flex-col justify-center items-center gap-4 pb-4'>
							{open ? (
								<ConsentVideo
									src={link}
									title={itemTitle}
									className='w-full rounded-xl aspect-video max-h-[55vh]'
								/>
							) : (
								<div
									aria-hidden='true'
									className='w-full rounded-xl aspect-video max-h-[55vh] bg-black/5'
								/>
							)}

							<TextLink
								className='text-xs sm:text-sm md:text-base my-3 block hover:text-(--color-ochre) text-(--color-granite) break-all'
								href={subtitle}
								text={subtitle}
								openInNewTab
							/>
						</div>
					) : (
						<div className='px-4 sm:px-10 md:px-20 text-sm sm:text-base md:text-lg pb-4 whitespace-pre-wrap'>
							{subtitle}
						</div>
					)}
				</div>
			</DrawerContent>
		</Drawer>
	)
}
