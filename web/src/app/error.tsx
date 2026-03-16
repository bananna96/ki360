'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<main className='flex h-full flex-col items-center justify-center'>
			<h2 className='text-center'>Something went wrong!</h2>
			<Button
				type='button'
				variant='ghost'
				className='mt-4 h-auto rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-400'
				onClick={() => reset()}
			>
				Try again
			</Button>
		</main>
	)
}
