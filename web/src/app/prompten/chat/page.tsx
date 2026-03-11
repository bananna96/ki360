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
import { Breadcrumbs } from '@/components/custom/Breadcrumbs'

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
		<div className='w-screen px-4 pb-4'>
			<Breadcrumbs className='mb-4 md:mb-6' />
			<ChatBot />
		</div>
	)
}
