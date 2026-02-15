export const revalidate = 3600 // 3600 seconds = 1 hour, 86400 seconds = 1 day, 604800 seconds = 1 week

import { client } from '@/lib/sanity/client'
import { chaptersQuery } from '@/lib/sanity/queries'
import { Icon } from '@/components/custom/Icons'
import { IconTextLink } from '@/components/custom/Link'

export default async function Home() {
	const chapters = await client.fetch(chaptersQuery)

	return (
		<div className='flex flex-col'>
			<div className='min-h-screen w-full items-end justify-start wrapper-cols-12'>
				{/* TODO: mb und pb checken bei text und icon */}
				<div className='col-span-12 flex justify-between items-end pb-20 sm:pb-0'>
					<h1 className=''>Was ist KI?</h1>
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
					<h2>KI ist längst Teil unseres Alltags</h2>
					<p>
						Künstliche Intelligenz begegnet uns heute überall – oft, ohne dass
						wir sie bewusst wahrnehmen. Sie empfiehlt uns Inhalte, unterstützt
						bei Kommunikation, erkennt Bilder, übersetzt Texte oder trifft
						Entscheidungen im Hintergrund. Gleichzeitig wirkt KI für meist
						abstrakt, technisch und schwer greifbar. Diese Webseite bietet einen
						verständlichen Einstieg in das Thema. Sie zeigt, was KI ist, wo wir
						ihr begegnen und wie wir sie am besten für un nutzen können – ohne
						Vorwissen und Schritt für Schritt.
					</p>
				</div>
				<div className='flex justify-end items-start col-span-full pb-10 lg:justify-end lg:col-start-9 lg:pb-30 xl:col-span-5'>
					<div className='flex flex-col items-start'>
						<IconTextLink
							text='Grundlagen'
							href='/grundlagen'
							ariaLabel='Zu den Grundlagen der KI'
							icon='arrow-diagonal'
							colorVar='--color-softLinen'
							hoverColorVar='--color-skyBlue'
						/>
						<IconTextLink
							text='Geschichte & Entwicklung'
							href='/geschichte'
							ariaLabel='Zur Geschichte und Entwicklung der KI'
							icon='arrow-diagonal'
							colorVar='--color-softLinen'
							hoverColorVar='--color-skyBlue'
						/>
						<IconTextLink
							text='Kommunikation mit KI'
							href='/kommunikation'
							ariaLabel='Zur Kommunikation mit KI'
							icon='arrow-diagonal'
							colorVar='--color-softLinen'
							hoverColorVar='--color-skyBlue'
						/>
						<IconTextLink
							text='KI im Alltag'
							href='/alltag'
							ariaLabel='Zum Thema KI im Alltag'
							icon='arrow-diagonal'
							colorVar='--color-softLinen'
							hoverColorVar='--color-skyBlue'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
