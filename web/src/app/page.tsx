export const revalidate = 3600 // 3600 seconds = 1 hour, 86400 seconds = 1 day, 604800 seconds = 1 week
import { client } from '@/lib/sanity/client'
import { Icon } from '@/components/custom/Icons'
import { IconTextLink } from '@/components/custom/Link'
import { landingpageQuery } from '@/lib/sanity/queries'

// TODO: zod nutzen? für richtige prüfung der daten
// import { z } from 'zod'

// const ContentSchema = z.object({
//   title: z.string(),
//   intro: z.string().optional(),
//   subtitle: z.string(),
//   content: z.string(),
//   links: z.array(z.object({
//     text: z.string(),
//     url: z.string(),
//   })),
// })

// const data = await client.fetch(LandingpageQuery)
// const content = ContentSchema.parse(data) // jetzt wird wirklich geprüft!

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

	return (
		<div className='flex flex-col'>
			<div className='min-h-screen w-full items-end justify-start wrapper-cols-12'>
				{/* TODO: mb und pb checken bei text und icon */}
				<div className='col-span-12 flex justify-between items-end pb-20 sm:pb-0'>
					<h1>{content.title}</h1>
					<Icon
						// TODO: besser lösung für color? sodass man sie an einer stelle hat)
						name='arrow-down'
						color='#492e19'
						size={64}
						className='xs:mb-8 sm:mb-0 animate-bounce'
					/>
				</div>
			</div>
			<div className='min-h-screen w-full items-end  wrapper-cols-12 bg-[var(--color-granite)]'>
				<div className='col-span-full lg:col-span-6 flex flex-col text-[var(--color-softLinen)] gap-10 justify-center lg:pb-30'>
					<h3>{content.subtitle}</h3>
					<p>{content.content}</p>
				</div>
				<div className='flex justify-end items-start col-span-full pb-10 lg:justify-end lg:col-start-9 lg:pb-30 xl:col-span-5'>
					<div className='flex flex-col items-start'>
						{content.links.map((link: { text: string; url: string }) => (
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
