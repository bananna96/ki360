export const revalidate = 3600 // 3600 seconds = 1 hour, 86400 seconds = 1 day, 604800 seconds = 1 week
import { client } from '@/lib/sanity/client'
import { whatIsAiQuery } from '@/lib/sanity/queries'
import { SanityImage } from '@/components/SanityImage'
import Link from 'next/link'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { IconButton } from '@/components/ui/button'
import { ReadButton } from '@/components/custom/ReadBtn'
import { ConsentVideo } from '@/components/custom/ConsentVideo'

interface SanityImageAsset {
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
	[key: string]: any
}

interface SanityImage {
	asset: SanityImageAsset
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

interface Link {
	text: string
	url: string
}

interface WhatIsAiContent {
	section1: {
		title: string
		description: string
		image: SanityImage
	}
	section2: Link
	section3: {
		title: string
		items: {
			itemTitle: string
			subtitle: string
			link: Link
			image: SanityImage
		}[]
	}
	section4: {
		title: string
		backgroundImage: SanityImage
		blocks: {
			title: string
			description: string
			items: string[]
		}[]
	}
	section5: {
		title: string
		items: {
			itemTitle: string
			subtitle: string
			link: string
			image: SanityImage
		}[]
		overlayText: {
			title: string
			items: {
				itemTitle: string
				subtitle: string
				link: Link
				image: SanityImage
			}[]
		}[]
	}
}

export default async function Page() {
	const content = await client.fetch<WhatIsAiContent>(whatIsAiQuery)

	return (
		<div className='flex flex-col'>
			{/* SECTION 1 */}
			<div
				className='w-full flex flex-col md:grid md:grid-cols-12 md:items-stretch px-4 md:px-10 lg:px-20'
				// TODO: remove extra style attr
				style={{ minHeight: 'calc(100dvh - var(--height-nav))' }}
			>
				<div className='md:col-span-7 flex flex-col justify-end gap-4 pb-10 mt-auto md:mt-0'>
					<h4 className='text-2xl md:text-4xl lg:text-5xl'>
						{content.section1.title}
					</h4>
					<span className='text-base md:text-lg'>
						{content.section1.description}
					</span>
				</div>
				<div className='md:col-start-9 md:col-end-13 relative h-[30vh] -mx-4 w-[calc(100%+2rem)] md:h-auto md:mx-0 md:w-auto md:-mr-20 shrink-0'>
					<SanityImage
						src={content.section1.image.asset.url}
						className='object-cover'
						fill
						alt={content.section1.image.alt}
						sizes='(max-width: 768px) 100vw, 33vw'
						placeholder={
							content.section1.image.asset.metadata?.lqip ? 'blur' : 'empty'
						}
						blurDataURL={content.section1.image.asset.metadata?.lqip}
					/>
				</div>
			</div>

			{/* SECTION 2 */}
			<div className='w-full bg-(--color-granite)'>
				<ConsentVideo
					src={content.section2.url}
					title={content.section2.text}
					className='w-full aspect-video'
				/>
			</div>

			{/* SECTION 3 */}
			<div className='min-h-screen w-full px-4 md:px-10 lg:px-20 py-16 bg-(--color-frost) flex flex-col justify-center text-(--color-glossyBlack)'>
				<h3 className='text-2xl md:text-4xl lg:text-5xl'>
					{content.section3.title}
				</h3>
				<div className='flex flex-col md:flex-row justify-between gap-8 md:gap-4 mt-10 md:mt-20'>
					{content.section3.items.map((item, index) => (
						<div
							key={index}
							className='w-full md:w-[30%] flex flex-col justify-start items-center'
						>
							<h5 className='text-lg md:text-xl text-center'>
								{item.itemTitle}
							</h5>
							<span className='text-sm md:text-base text-center'>
								{item.subtitle}
							</span>
							<div className='relative mt-6 w-24 h-24 md:w-36 md:h-36'>
								<SanityImage
									src={item.image.asset.url}
									alt={item.image.alt ?? `Image ${index}`}
									className='object-contain'
									fill
									sizes='(max-width: 768px) 96px, 150px'
									placeholder={
										item.image.asset.metadata?.lqip ? 'blur' : 'empty'
									}
									blurDataURL={item.image.asset.metadata?.lqip}
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* SECTION 4 */}
			<div className='relative min-h-screen w-full px-4 md:px-10 lg:px-20 py-16 overflow-hidden flex flex-col justify-between'>
				{/* Hintergrundbild */}
				{content.section4.backgroundImage && (
					<SanityImage
						src={content.section4.backgroundImage.asset.url}
						alt={content.section4.backgroundImage.alt}
						fill
						className='object-cover -z-10'
						sizes='100vw'
						placeholder={
							content.section4.backgroundImage.asset.metadata?.lqip
								? 'blur'
								: 'empty'
						}
						blurDataURL={content.section4.backgroundImage.asset.metadata?.lqip}
					/>
				)}
				<div className='absolute inset-0 bg-(--color-glossyBlack)/60 -z-10' />

				<div className='relative flex flex-col text-(--color-softLinen) gap-10 w-full'>
					<h3 className='w-full text-2xl md:text-4xl lg:text-5xl'>
						{content.section4.title}
					</h3>
				</div>

				<div className='relative flex items-center justify-center flex-1'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 w-full'>
						{content.section4.blocks.map((block, index) => (
							<div
								key={index}
								className='flex flex-col gap-4 bg-(--color-granite) rounded-lg p-6 text-(--color-softLinen)'
							>
								<h4 className='text-xl md:text-2xl font-semibold'>
									{block.title}
								</h4>
								<p className='text-sm md:text-base'>{block.description}</p>
								{block.items?.length > 0 && (
									<ul className='flex flex-col gap-2 mt-2'>
										{block.items.map((item, i) => (
											<li
												key={i}
												className='flex items-start gap-2 text-sm md:text-base'
											>
												{item}
											</li>
										))}
									</ul>
								)}
							</div>
						))}
					</div>
				</div>
			</div>

			{/* SECTION 5 */}
			<div className='min-h-screen w-full px-4 md:px-10 lg:px-20 py-16 bg-(--color-frost)'>
				<h3 className='text-2xl md:text-4xl lg:text-5xl mt-10 md:mt-20 mb-10'>
					{content.section5.title}
				</h3>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center pb-10'>
					{content.section5.items.map((item, index) => {
						const card = (
							<div className='flex flex-col items-center cursor-pointer group'>
								<h5 className='text-lg md:text-xl text-center'>
									{item.itemTitle}
								</h5>
								<p className='text-sm md:text-base text-center'>
									{item.subtitle}
								</p>
								<div className='relative w-full aspect-square max-w-[320px] mt-4 overflow-hidden rounded-lg'>
									<SanityImage
										src={item.image.asset.url}
										alt={item.image.alt ?? `Image ${index}`}
										fill
										className='object-cover transition-transform duration-600 group-hover:scale-120'
										sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px'
										placeholder={
											item.image.asset.metadata?.lqip ? 'blur' : 'empty'
										}
										blurDataURL={item.image.asset.metadata?.lqip}
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
						)

						if (index === 0) {
							return (
								<Link
									key={index}
									href={item.link || '/'}
									aria-label={item.itemTitle}
									className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg'
								>
									{card}
								</Link>
							)
						}

						const overlay = content.section5.overlayText[index - 1]

						const fullOverlayText = overlay?.items
							?.map((ovItem) => `${ovItem.itemTitle}. ${ovItem.subtitle}`)
							.join('. ')

						return (
							<Drawer
								key={index}
								shouldScaleBackground={false}
								setBackgroundColorOnScale={false}
								noBodyStyles
							>
								<DrawerTrigger asChild>
									<button
										type='button'
										aria-label={`${item.itemTitle} öffnen`}
										className='text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg w-full'
									>
										{card}
									</button>
								</DrawerTrigger>

								<DrawerContent className='px-4 md:px-8 pb-8 max-h-[80vh] flex flex-col'>
									<DrawerHeader className='px-4 md:px-20 flex flex-row justify-between items-center gap-4'>
										<ReadButton
											text={fullOverlayText ?? item.subtitle}
											className='w-8 h-8 sm:w-10 sm:h-10 shrink-0'
										/>
										<DrawerTitle
											asChild
											className='text-2xl sm:text-4xl md:text-4xl leading-none text-center flex-1'
										>
											<h3>{overlay?.title ?? item.itemTitle}</h3>
										</DrawerTitle>
										<DrawerClose asChild>
											<IconButton
												icon='cancel'
												ariaLabel='Schließen'
												iconColor='#db761c'
												iconSize={36}
												variant='ghost'
												size='icon'
											/>
										</DrawerClose>
									</DrawerHeader>

									<DrawerDescription className='px-4 md:px-20 text-sm text-center'>
										{item.subtitle}
									</DrawerDescription>

									<div className='px-4 md:px-20 pb-6 grid gap-4 overflow-y-auto mt-4'>
										{overlay?.items?.map((ovItem, ovIndex) => (
											<div key={ovIndex}>
												<h5 className='text-base md:text-lg font-bold'>
													{ovItem.itemTitle}
												</h5>
												<p className='text-sm text-justify'>
													{ovItem.subtitle}
												</p>
											</div>
										))}
									</div>
								</DrawerContent>
							</Drawer>
						)
					})}
				</div>
			</div>
		</div>
	)
}
