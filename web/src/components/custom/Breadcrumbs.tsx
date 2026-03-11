'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

function formatSegment(segment: string) {
	return decodeURIComponent(segment)
		.replace(/[-_]+/g, ' ')
		.replace(/\b\w/g, (c) => c.toUpperCase())
}

export function Breadcrumbs({ className }: { className?: string }) {
	const pathname = usePathname()
	const segments = pathname.split('/').filter(Boolean)

	return (
		<Breadcrumb className={className}>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href='/'>Startseite</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>

				{segments.map((segment, i) => {
					const href = '/' + segments.slice(0, i + 1).join('/')
					const isLast = i === segments.length - 1
					const label = formatSegment(segment)

					return (
						<Fragment key={href}>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								{isLast ? (
									<BreadcrumbPage>{label}</BreadcrumbPage>
								) : (
									<BreadcrumbLink asChild>
										<Link href={href}>{label}</Link>
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
						</Fragment>
					)
				})}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
