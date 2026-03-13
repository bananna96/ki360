import { client } from '@/lib/sanity/client'
import { privacyPolicyQuery } from '@/lib/sanity/queries'

export const revalidate = 3600

interface PolicySection {
	title?: string
	paragraphs?: string[]
	listTitle?: string
	listItems?: string[]
}

interface PrivacyPolicyContent {
	title: string
	content?: PolicySection[]
}

export default async function Page() {
	const content = await client.fetch<PrivacyPolicyContent>(privacyPolicyQuery)

	return (
		<div className='flex flex-col'>
			<div className='w-full px-4 md:px-10 lg:px-20 py-16 bg-(--color-frost)'>
				<div className='mx-auto w-full max-w-4xl flex flex-col gap-10 text-(--color-glossyBlack)'>
					<h2 className='text-(--color-skyBlue) text-center'>
						{content.title}
					</h2>

					<div className='flex flex-col gap-12'>
						{content.content?.map((section, index) => (
							<div
								key={index}
								className='flex flex-col'
							>
								{section.title && (
									<h3 className='text-2xl my-4'>{section.title}</h3>
								)}

								{section.paragraphs?.map((paragraph, paragraphIndex) => (
									<p
										key={paragraphIndex}
										className='whitespace-pre-line'
									>
										{paragraph}
									</p>
								))}

								{section.listItems?.length ? (
									<div className='flex flex-col gap-4'>
										{section.listTitle && (
											<span className='font-bold mt-6'>
												{section.listTitle}
											</span>
										)}

										<ul className='flex flex-col gap-3'>
											{section.listItems.map((item, itemIndex) => (
												<li
													key={itemIndex}
													className='flex items-start gap-3'
												>
													<span className='mt-2 h-2 w-2 shrink-0 rounded-full bg-(--color-skyBlue)' />
													<span>{item}</span>
												</li>
											))}
										</ul>
									</div>
								) : null}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
