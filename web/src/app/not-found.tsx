import Link from 'next/dist/client/link'

export default function NotFound() {
	return (
		<main className='flex h-screen flex-col items-center justify-center'>
			<h1>404</h1>
			<h5>Page Not Found</h5>
			<Link
				href='/'
				className='mt-4 rounded-sm bg-(--color-skyBlue) px-4 py-2 transition-colors hover:bg-(--color-softLinen)'
			>
				Startseite
			</Link>
		</main>
	)
}
