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
			<div className='mt-20 w-screen flex flex-col justify-center items-center px-4'>
				<div className='grid w-full grid-cols-3 items-center'>
					<div />
					<h3 className='text-center'>{content.intro.title}</h3>
					<div className='justify-self-end'>
						<ButtonLink
							href={content.btnLink.url}
							text={content.btnLink.text}
							className='m-4'
						/>
					</div>
				</div>

				<span className='text-center'>{content.intro.description}</span>
				<PromptSlider slidesContent={sliderContent} />
			</div>
		</>
	)
}
