export const revalidate = 3600 // 3600 seconds = 1 hour, 86400 seconds = 1 day, 604800 seconds = 1 week

import { client } from '@/lib/sanity/client'
import { chaptersQuery } from '@/lib/sanity/queries'
import { Icon } from '@/components/custom/Icons'

interface Chapter {
	_id: string
	title: string
	slug: string
	intro?: string
}

export default async function Home() {
	const chapters = await client.fetch(chaptersQuery)

	return (
		<div className='flex flex-col'>
			<div className='h-screen w-full items-end justify-start wrapper-cols-12'>
				<div className='col-span-12 flex justify-between items-end'>
					<h1 className=''>Was ist KI?</h1>
					<Icon
						name='arrow-down'
						color='#492e19'
						size={64}
					/>
				</div>
			</div>
			<div className='h-screen w-full items-center justify-start wrapper-cols-12 bg-[var(--color-granite)]'>
				<div className='col-span-7 flex flex-col text-[var(--color-softLinen)] gap-10 justify-center'>
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
				<div className='col-start-9 col-span-full flex justify-center '>
					<p className=''>Wie funktioniert KI?</p>
				</div>
			</div>
		</div>
	)
}
