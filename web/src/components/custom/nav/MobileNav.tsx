'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { MobileNavProps } from './types'

export default function MobileNav({ links, className }: MobileNavProps) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className={className}>
			<Button
				type='button'
				variant='ghost'
				className='h-auto px-3 py-2'
				aria-label='Menü öffnen'
				aria-controls='mobile-menu'
				aria-expanded={isOpen}
				onClick={() => setIsOpen(true)}
			>
				Menü
			</Button>

			{isOpen && (
				<div
					id='mobile-menu'
					className='animate-fade-in-left fixed inset-0 z-50 bg-(--color-frost) flex flex-col p-6'
				>
					<div className='flex justify-end'>
						<Button
							type='button'
							variant='ghost'
							className='h-auto px-3 py-2'
							aria-label='Menü schließen'
							onClick={() => setIsOpen(false)}
						>
							Schließen
						</Button>
					</div>
					<ul
						className='mt-6 flex flex-col gap-6'
						role='list'
					>
						{links.map((link) => (
							<li key={link.text}>
								{link.url ? (
									<Link
										href={link.url}
										className='text-2xl'
										onClick={() => setIsOpen(false)}
									>
										{link.text}
									</Link>
								) : (
									<span className='text-2xl'>{link.text}</span>
								)}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}
