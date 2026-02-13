import { Suspense } from 'react'
import Loading from './loading'

export default function Page() {
	return (
		<div>
			<h1>Grundlagen</h1>
			<Suspense fallback={<Loading />}>
				<p>Some Grundlagen</p>
			</Suspense>
			{/* TODO: bei mehrern kompnenten (zB. mehrere cards) wrapper bauen https://nextjs.org/learn/dashboard-app/streaming#grouping-components  */}
		</div>
	)
}
