export const revalidate = 3600 // 3600 seconds = 1 hour, 86400 seconds = 1 day, 604800 seconds = 1 week

import { client } from '@/lib/sanity/client'
import { chaptersQuery } from '@/lib/sanity/queries'

export default async function Home() {
	const chapters = await client.fetch(chaptersQuery)

	interface Chapter {
		_id: string
		title: string
		slug: string
		intro?: string
	}

	return (
		<div className='h-screen w-full flex items-end justify-start'>
			<h1>Was ist KI?</h1>
			{/* {chapters.map((c: Chapter) => (
						<div
							key={c._id}
							style={{ marginBottom: 16 }}
						>
							<h2>{c.title}</h2>
							<div>Slug: {c.slug}</div>
							{c.intro ? <p>{c.intro}</p> : null}
						</div>
					))} */}
		</div>
	)
}
