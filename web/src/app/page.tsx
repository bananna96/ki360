import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { Icon } from '@/components/custom/Icons'
import { IconTextLink } from '@/components/custom/Link'
import { landingpageQuery } from '@/lib/sanity/queries'

export const revalidate = 3600

interface Content {
	title: string
	intro?: string
	subtitle: string
	content: string
	links: {
		text: string
		url: string
	}[]
}

export default async function Home() {
	const content = await client.fetch<Content>(landingpageQuery)
	const isProduction = false //process.env.NODE_ENV === 'production'

	return isProduction ? (
		<div className='min-h-screen flex items-center justify-center px-6'>
			<div className='w-full max-w-3xl flex flex-col items-center text-center gap-4'>
				<Image
					src='/Logo_full.svg'
					alt='ki360 logomark'
					className='w-full h-auto max-w-[320px] sm:max-w-[420px] md:max-w-[560px]'
					width={500}
					height={500}
					sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
				/>
				<h5 className='text-sm sm:text-base md:text-lg font-medium tracking-wide animate-pulse'>
					COMING SOON
				</h5>
			</div>
		</div>
	) : (
		<div className='flex flex-col'>
			<div className='min-h-screen-minus-nav w-full items-end justify-start wrapper-cols-12'>
				<div className='col-span-12 flex justify-between items-end pb-20 sm:pb-0'>
					<h1>{content.title}</h1>
					<Icon
						name='arrow-down'
						color='#492e19'
						size={64}
						aria-hidden='true'
						className='xs:mb-8 sm:mb-0 animate-bounce motion-reduce:animate-none'
					/>
				</div>
			</div>

			<div className='min-h-screen w-full items-end wrapper-cols-12 bg-(--color-granite)'>
				<div className='col-span-full lg:col-span-6 flex flex-col text-(--color-softLinen) gap-10 justify-center lg:pb-30'>
					<h3>{content.subtitle}</h3>
					<p>{content.content}</p>
				</div>

				<div className='flex justify-end items-start col-span-full pb-10 lg:justify-end lg:col-start-9 lg:pb-30 xl:col-span-5'>
					<div className='flex flex-col items-start'>
						{content.links.map((link) => (
							<IconTextLink
								key={link.url}
								text={link.text}
								href={link.url}
								ariaLabel={`Zu ${link.text}`}
								icon='arrow-diagonal'
								colorVar='--color-softLinen'
								hoverColorVar='--color-skyBlue'
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
