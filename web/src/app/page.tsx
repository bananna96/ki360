import Image from 'next/image'

export default async function Home() {
	return (
		<main className='min-h-screen flex items-center justify-center px-6 py-12'>
			<div className='w-full max-w-3xl flex flex-col items-center text-center gap-4'>
				<Image
					src='./Logo_full.svg'
					alt='ki360 logomark'
					className='w-full h-auto max-w-[320px] sm:max-w-[420px] md:max-w-[560px]'
					width={500}
					height={500}
					sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
				/>
				<h5 className='text-sm sm:text-base md:text-lg font-medium tracking-wide animate-pulse'>
					COMING SOON
				</h5>
			</div>
		</main>
	)
}
