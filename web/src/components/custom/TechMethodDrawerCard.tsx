'use client'

import { useState } from 'react'
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
	const hasIframe = Boolean(link)

	return (
		<Drawer
			open={open}
			onOpenChange={setOpen}
		>
			<DrawerTrigger asChild>
				<button
					type='button'
					aria-label={`${itemTitle} öffnen`}
					className={`h-[40vh] ${colSpanClass} cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
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

			<DrawerContent className='px-8 pb-8 border-0 min-h-fit max-h-screen flex flex-col'>
				<DrawerHeader className='px-20 pt-0 flex flex-row justify-between items-start gap-4'>
					<ReadButton
						text={subtitle}
						disabled={hasIframe}
						className={`w-10 h-10 ${hasIframe ? 'invisible pointer-events-none' : ''}`}
					/>

					<div className='min-w-0 flex-1'>
						<DrawerTitle className='text-[8em]'>{itemTitle}</DrawerTitle>
						<DrawerDescription className='sr-only'>
							{hasIframe ? `${itemTitle} mit eingebettetem Inhalt` : subtitle}
						</DrawerDescription>
					</div>

					<DrawerClose asChild>
						<IconButton
							icon='cancel'
							ariaLabel='Schließen'
							iconColor='#db761c'
							iconSize={48}
							variant='ghost'
							size='icon-lg'
							className='self-start'
						/>
					</DrawerClose>
				</DrawerHeader>

				{hasIframe ? (
					<div className='px-40 overflow-hidden flex flex-col justify-center items-center'>
						{open ? (
							<iframe
								src={link}
								className='w-full max-h-[70vh] rounded-xl aspect-video'
								title={itemTitle}
								loading='lazy'
								sandbox='allow-scripts allow-same-origin allow-presentation allow-popups'
								referrerPolicy='strict-origin-when-cross-origin'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen'
								allowFullScreen
							/>
						) : (
							<div
								aria-hidden='true'
								className='w-full max-h-[70vh] rounded-xl aspect-video bg-black/5'
							/>
						)}

						<TextLink
							className='my-3 block hover:text-(--color-ochre) text-(--color-granite)'
							href={subtitle}
							text={subtitle}
							openInNewTab
						/>
					</div>
				) : (
					<div className='px-20 shrink-0'>{subtitle}</div>
				)}
			</DrawerContent>
		</Drawer>
	)
}
