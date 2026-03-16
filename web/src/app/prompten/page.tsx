import { client } from '@/lib/sanity/client'
import { promptingQuery } from '@/lib/sanity/queries'
import {
	PromptSlider,
	PromptingSliderType,
} from '@/components/custom/PromptSlider'
import { ButtonLink } from '@/components/custom/Link'

export default async function Page() {
	const content = await client.fetch(promptingQuery)
	type PromptSlide = {
		tip: string
		bullets: string[]
		example: string
		image: PromptingSliderType['image']
	}

	const sliderContent: PromptingSliderType[] = content.slides.map(
		(slide: PromptSlide) => ({
			tip: slide.tip,
			bullets: slide.bullets,
			example: slide.example,
			image: slide.image,
		}),
	)
	return (
		<div className='w-full flex flex-col justify-center items-center px-4 md:px-10 lg:px-20 overflow-x-hidden'>
			<div className='w-full flex flex-col justify-center items-center gap-4'>
				<h3>{content.intro.title}</h3>
				<span className='text-center'>{content.intro.description}</span>
			</div>

			<PromptSlider slidesContent={sliderContent} />

			<div className='flex justify-center w-full'>
				<ButtonLink
					href={content.btnLink.url}
					text={content.btnLink.text}
					className='m-4'
				/>
			</div>
		</div>
	)
}
