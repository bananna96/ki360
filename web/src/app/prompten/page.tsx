import { client } from '@/lib/sanity/client'
import { promptingQuery } from '@/lib/sanity/queries'
import {
	PromptSlider,
	PromptingSliderType,
} from '@/components/custom/PromptSlider'
import { ButtonLink } from '@/components/custom/Link'

export const revalidate = 3600

interface PromptingPageData {
	intro: {
		title: string
		description: string
	}
	slides: PromptingSliderType[]
	btnLink: {
		text: string
		url: string
	}
}

export default async function Page() {
	const content = await client.fetch<PromptingPageData>(promptingQuery)

	return (
		<>
			<div className='mt-20 w-screen flex flex-col justify-center items-center'>
				<h3>{content.intro.title}</h3>
				<span>{content.intro.description}</span>
				<PromptSlider slidesContent={content.slides} />
				<ButtonLink
					href={content.btnLink.url}
					text={content.btnLink.text}
					className='p-4'
				/>
			</div>
		</>
	)
}
