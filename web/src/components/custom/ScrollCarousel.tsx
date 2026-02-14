'use client'
// TODO: nochmal anschauen, ggf. verbessern.
import React, {
	useRef,
	useLayoutEffect,
	useEffect,
	useMemo,
	useState,
} from 'react'

export default function InfiniteScrollCarousel({
	items,
	className,
	repeat = 3,
	autoScroll = true,
	autoScrollSpeed = 0.5,
}: {
	items: React.ReactNode[]
	className?: string
	repeat?: number
	autoScroll?: boolean
	autoScrollSpeed?: number
}) {
	const scrollRef = useRef<HTMLDivElement>(null)
	const itemCount = items.length
	const [ready, setReady] = useState(false)

	// Items mehrfach rendern (memoized, damit wir bei Re-Renders nicht neu flatmappen)
	const repeatedItems = useMemo(
		() => Array.from({ length: repeat }).flatMap(() => items),
		[items, repeat],
	)

	/**
	 * Helper: Wrap-Logik mit Puffer, um Rundungs-/Subpixel-Jitter zu vermeiden.
	 */
	const wrapIfNeeded = () => {
		const el = scrollRef.current
		if (!el) return
		if (itemCount === 0) return

		const totalSegments = itemCount * repeat
		const itemWidth = el.scrollWidth / totalSegments

		// Puffer, damit nicht bei kleinsten Abweichungen sofort gesprungen wird
		const buffer = itemWidth * 0.5

		const leftLimit = buffer
		const rightLimit = itemWidth * itemCount * (repeat - 2) + buffer

		if (el.scrollLeft < leftLimit) {
			el.scrollLeft += itemWidth * itemCount
		} else if (el.scrollLeft > rightLimit) {
			el.scrollLeft -= itemWidth * itemCount
		}
	}

	/**
	 * Initiale Position möglichst ohne sichtbaren "Jump" setzen.
	 * useLayoutEffect läuft vor dem Paint → weniger Ruckeln beim ersten Render.
	 */
	useLayoutEffect(() => {
		const el = scrollRef.current
		if (!el) return
		if (itemCount === 0) return

		setReady(false)

		// Ein Frame warten, damit scrollWidth verlässlich ist (DOM/layout done)
		const raf = requestAnimationFrame(() => {
			const totalSegments = itemCount * repeat
			const itemWidth = el.scrollWidth / totalSegments

			// in die "mittlere" Kopie springen
			el.scrollLeft = itemWidth * itemCount

			// Falls direkt an einer Grenze gelandet: robust machen
			wrapIfNeeded()

			setReady(true)
		})

		return () => cancelAnimationFrame(raf)
	}, [itemCount, repeat])

	/**
	 * Wenn sich die Größe ändert (Fonts/Bilder/Responsive), neu zentrieren.
	 * ResizeObserver ist zuverlässiger als scrollWidth-Polling.
	 */
	useEffect(() => {
		const el = scrollRef.current
		if (!el) return
		if (itemCount === 0) return

		let raf = 0
		const ro = new ResizeObserver(() => {
			// Nur wenn wir schon initialisiert haben, sonst doppelt
			raf = requestAnimationFrame(() => {
				const totalSegments = itemCount * repeat
				const itemWidth = el.scrollWidth / totalSegments
				el.scrollLeft = itemWidth * itemCount
				wrapIfNeeded()
				setReady(true)
			})
		})

		ro.observe(el)
		return () => {
			cancelAnimationFrame(raf)
			ro.disconnect()
		}
	}, [itemCount, repeat])

	/**
	 * Scroll-Event: nur wrap prüfen, kein extra Layout-Kram.
	 */
	const onScroll = () => {
		wrapIfNeeded()
	}

	/**
	 * Wheel: vertikales Wheel in horizontales Scroll umwandeln.
	 */
	const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
		const el = scrollRef.current
		if (!el) return
		if (el.scrollWidth <= el.clientWidth) return
		if (e.deltaY === 0) return

		e.preventDefault()
		el.scrollLeft += e.deltaY
		wrapIfNeeded()
	}

	/**
	 * Auto-Scroll: erst starten, wenn ready (Initial-ScrollLeft gesetzt).
	 * Kein setTimeout (nondeterministisch), sondern rAF-only.
	 */
	useEffect(() => {
		if (!autoScroll) return
		if (!ready) return

		const el = scrollRef.current
		if (!el) return
		if (itemCount === 0) return

		let raf = 0

		const step = () => {
			const cur = scrollRef.current
			if (!cur) return

			// Kleine Speed-Werte wirken oft smoother (z.B. 0.5)
			cur.scrollLeft += autoScrollSpeed
			wrapIfNeeded()

			raf = requestAnimationFrame(step)
		}

		raf = requestAnimationFrame(step)
		return () => cancelAnimationFrame(raf)
	}, [autoScroll, autoScrollSpeed, itemCount, repeat, ready])

	return (
		<div
			ref={scrollRef}
			onWheel={onWheel}
			onScroll={onScroll}
			className={`mask-center mask-size-[100%_100%] mask-[url(/imgs/carousel_mask.png)] whitespace-nowrap ${className ?? ''}`}
			style={{ overscrollBehaviorX: 'contain' }}
		>
			<div className='flex '>
				{repeatedItems.map((item, i) => (
					<div
						key={i}
						className='h-110 min-w-[400px] max-w-xs bg-white rounded-lg p-4 flex items-center justify-center'
					>
						{item}
					</div>
				))}
			</div>
		</div>
	)
}
