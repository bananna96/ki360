import { client } from '@/lib/sanity/client'
import { Icon } from '@/components/custom/Icons'
import { IconTextLink } from '@/components/custom/Link'
import { landingpageQuery } from '@/lib/sanity/queries'

export const revalidate = 3600

type Content = {
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

	return (
		<div className='flex flex-col'>
			<div className='min-h-screen-minus-nav w-full items-end justify-start wrapper-cols-12'>
				<div className='col-span-12 flex justify-between items-end pb-20 sm:pb-0'>
					<h1 className='flex-1 min-w-0'>{content.title}</h1>
					<Icon
						name='arrow-down'
						color='#492e19'
						size={64}
						aria-hidden='true'
						className='shrink-0 ml-4 animate-bounce motion-reduce:animate-none'
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
