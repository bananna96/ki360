'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function MatomoPageView() {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		const q = searchParams?.toString()
		const url = `${pathname}${q ? `?${q}` : ''}`

		const w = window as unknown as {
			_paq?: Array<[string, ...unknown[]]>
		}

		if (!w._paq) return
		w._paq.push(['setCustomUrl', url])
		w._paq.push(['setDocumentTitle', document.title])
		w._paq.push(['trackPageView'])
	}, [pathname, searchParams])

	return null
}
