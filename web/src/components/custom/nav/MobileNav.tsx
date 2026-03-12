'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { MobileNavProps } from './types'

export default function MobileNav({ links, className }: MobileNavProps) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className={className}>
			{/* TODO: Replace durch Btn-Component */}
			<button
				type='button'
				className='px-3 py-2'
				aria-label='Menü öffnen'
				aria-controls='mobile-menu'
				aria-expanded={isOpen}
				onClick={() => setIsOpen(true)}
			>
				Menü
			</button>

			{isOpen && (
				<div
					id='mobile-menu'
					className='animate-fade-in-left fixed inset-0 z-50 bg-[var(--color-frost)] flex flex-col p-6'
				>
					<div className='flex justify-end'>
						{/* TODO: Replace durch Btn-Component */}
						<button
							type='button'
							className='px-3 py-2'
							aria-label='Menü schließen'
							onClick={() => setIsOpen(false)}
						>
							Schließen
						</button>
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
