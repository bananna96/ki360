import Link from 'next/link'
import { SanityImage } from '@/components/SanityImage'
import { client } from '@/lib/sanity/client'
import { aboutQuery } from '@/lib/sanity/queries'
import { IconTextLink } from '@/components/custom/Link'

export const revalidate = 3600

type SanityImageAsset = {
	url: string
	metadata?: {
		lqip?: string
		dimensions?: {
			width?: number
			height?: number
			aspectRatio?: number
		}
	}
}

type SanityImageType = {
	asset: SanityImageAsset
	alt?: string
}

type AboutSection = {
	title?: string
	paragraphs?: string[]
	listTitle?: string
	listItems?: string[]
}

type AboutContent = {
	title: string
	subtitle?: string
	image?: SanityImageType
	content?: AboutSection[]
}

export default async function Page() {
	const content = await client.fetch<AboutContent>(aboutQuery)

	return (
		<div className='flex flex-col'>
			{/* SECTION 1 */}
			<div className='min-h-screen w-full px-4 md:px-10 lg:px-20 py-16 wrapper-cols-12 items-center'>
				<div className='col-span-full lg:col-span-6 flex flex-col gap-8 text-(--color-glossyBlack)'>
					<h1>{content.title}</h1>

					{content.subtitle && (
						<h3 className='max-w-2xl'>{content.subtitle}</h3>
					)}
				</div>

				{content.image && (
					<div className='col-span-full lg:col-span-5 lg:col-start-8 relative w-full aspect-[4/5] overflow-hidden rounded-lg mt-10 lg:mt-0'>
						<SanityImage
							src={content.image.asset.url}
							alt={content.image.alt ?? content.title}
							fill
							className='object-cover'
							sizes='(max-width: 1024px) 100vw, 40vw'
							placeholder={
								content.image.asset.metadata?.lqip ? 'blur' : 'empty'
							}
							blurDataURL={content.image.asset.metadata?.lqip}
						/>
					</div>
				)}
			</div>

			{/* SECTION 2 */}
			<div className='w-full px-4 md:px-10 lg:px-20 py-16 bg-(--color-frost)'>
				<div className='flex flex-col gap-16'>
					{content.content?.map((section, index) => (
						<div
							key={index}
							className='wrapper-cols-12 gap-y-8'
						>
							<div className='col-span-full lg:col-span-4'>
								{section.title && (
									<h3 className='text-(--color-glossyBlack)'>
										{section.title}
									</h3>
								)}
							</div>

							<div className='col-span-full lg:col-span-7 lg:col-start-6 flex flex-col gap-6 text-(--color-glossyBlack)'>
								{section.paragraphs?.map((paragraph, paragraphIndex) => (
									<p
										key={paragraphIndex}
										className='whitespace-pre-line'
									>
										{paragraph}
									</p>
								))}

								{section.listItems?.length ? (
									<div className='flex flex-col gap-4'>
										{section.listTitle && <h5>{section.listTitle}</h5>}

										<ul className='flex flex-col gap-3'>
											{section.listItems.map((item, itemIndex) => (
												<li
													key={itemIndex}
													className='flex items-start gap-3'
												>
													<span className='mt-2 h-2 w-2 shrink-0 rounded-full bg-(--color-ochre)' />
													<span>{item}</span>
												</li>
											))}
										</ul>
									</div>
								) : null}
							</div>
						</div>
					))}
				</div>

				<div className='pt-6 mt-6 border-t border-(--color-deepWalnut) flex flex-col sm:flex-row gap-4 sm:gap-8 justify-end'>
					<IconTextLink
						text='Impressum'
						href='/about/impressum'
						ariaLabel='Zu Impressum'
						icon='arrow-diagonal'
						colorVar='--color-skyBlue'
						hoverColorVar='--color-granite'
					/>
					<IconTextLink
						text='Datenschutz'
						href='/about/datenschutz'
						ariaLabel='Zu Datenschutz'
						icon='arrow-diagonal'
						colorVar='--color-skyBlue'
						hoverColorVar='--color-granite'
					/>
				</div>
			</div>
		</div>
	)
}
