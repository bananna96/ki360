import { client } from '@/lib/sanity/client'
import { promptingQuery } from '@/lib/sanity/queries'
import {
	PromptSlider,
	PromptingSliderType,
} from '@/components/custom/PromptSlider'
import { ButtonLink } from '@/components/custom/Link'

export default async function Page() {
	const content = await client.fetch(promptingQuery)

	const sliderContent: PromptingSliderType[] = content.slides.map(
		(slide: any) => ({
			tip: slide.tip,
			bullets: slide.bullets,
			example: slide.example,
			image: slide.image,
		}),
	)
	return (
		<>
			<div className='mt-20 w-screen flex flex-col justify-center items-center'>
				<h3>{content.intro.title}</h3>
				<span>{content.intro.description}</span>
				<PromptSlider slidesContent={sliderContent} />
				<ButtonLink
					href={content.btnLink.url}
					text={content.btnLink.text}
					className='p-4'
				/>
			</div>
		</>
	)
}
