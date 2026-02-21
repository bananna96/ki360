import { client } from '@/lib/sanity/client'
import { promptingQuery } from '@/lib/sanity/queries'
import {
	PromptSlider,
	PromptingSliderType,
} from '@/components/custom/PromptSlider'
import { ButtonLink } from '@/components/custom/Link'
import { ChatBot } from '@/components/custom/ChatBot'
import { Icon } from '@/components/custom/Icons'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
			<div className='my-20 w-screen flex justify-center items-start'>
				<Link
					href='/prompten'
					aria-label='back'
					className='px-5'
				>
					<Icon
						name='arrow-left'
						color='#492e19'
						className='w-8! h-8!'
					/>
				</Link>
				<ChatBot />
			</div>
		</>
	)
}
