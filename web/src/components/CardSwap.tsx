import React, {
	Children,
	cloneElement,
	forwardRef,
	isValidElement,
	ReactElement,
	ReactNode,
	RefObject,
	useEffect,
	useMemo,
	useRef,
	useImperativeHandle,
} from 'react'
import gsap from 'gsap'
import './CardSwap.css'

// TODO: Aufrüumen und KI markieren
export type CardSwapProps = {
	width?: number | string
	height?: number | string
	cardDistance?: number
	verticalDistance?: number
	delay?: number
	pauseOnHover?: boolean
	onCardClick?: (idx: number) => void
	skewAmount?: number
	easing?: 'linear' | 'elastic'
	children: ReactNode
	autoSwap?: boolean
}

export type CardSwapRef = {
	swapNext: () => void
	swapPrev: () => void
	isAnimating: () => boolean
}

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
	customClass?: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
	({ customClass, ...rest }, ref) => (
		<div
			ref={ref}
			{...rest}
			className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
		/>
	),
)
Card.displayName = 'Card'

type CardRef = RefObject<HTMLDivElement | null>
type Slot = {
	x: number
	y: number
	z: number
	zIndex: number
}

const makeSlot = (
	i: number,
	distX: number,
	distY: number,
	total: number,
): Slot => ({
	x: i * distX,
	y: -i * distY,
	z: -i * distX * 1.5,
	zIndex: total - i,
})

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
	gsap.set(el, {
		x: slot.x,
		y: slot.y,
		z: slot.z,
		xPercent: -50,
		yPercent: -50,
		skewY: skew,
		transformOrigin: 'center center',
		zIndex: slot.zIndex,
		force3D: true,
	})

const CardSwap = forwardRef<CardSwapRef, CardSwapProps>(
	(
		{
			width = 500,
			height = 400,
			cardDistance = 60,
			verticalDistance = 70,
			delay = 5000,
			pauseOnHover = false,
			onCardClick,
			skewAmount = 6,
			easing = 'elastic',
			autoSwap = false,
			children,
		},
		ref,
	) => {
		const config =
			easing === 'elastic'
				? {
						ease: 'elastic.out(0.6,0.9)',
						durDrop: 1,
						durMove: 1,
						durReturn: 1,
						promoteOverlap: 0.9,
						returnDelay: 0.05,
					}
				: {
						ease: 'power1.inOut',
						durDrop: 0.8,
						durMove: 0.8,
						durReturn: 0.8,
						promoteOverlap: 0.45,
						returnDelay: 0.2,
					}

		const childArr = useMemo(
			() => Children.toArray(children) as ReactElement<CardProps>[],
			[children],
		)
		const refs = useMemo<CardRef[]>(
			() => childArr.map(() => React.createRef<HTMLDivElement>()),
			[childArr.length],
		)

		const order = useRef<number[]>(
			Array.from({ length: childArr.length }, (_, i) => i),
		)

		const tlRef = useRef<gsap.core.Timeline | null>(null)
		const intervalRef = useRef<number>(0)
		const container = useRef<HTMLDivElement>(null)
		const isAnimatingRef = useRef(false)
		const swapFunctionRef = useRef<(backward?: boolean) => void>(() => {})

		useImperativeHandle(ref, () => ({
			swapNext: () => swapFunctionRef.current(false),
			swapPrev: () => swapFunctionRef.current(true),
			isAnimating: () => isAnimatingRef.current, // NEU
		}))

		useEffect(() => {
			const total = refs.length
			refs.forEach((r, i) =>
				placeNow(
					r.current!,
					makeSlot(i, cardDistance, verticalDistance, total),
					skewAmount,
				),
			)

			const swap = (backward = false) => {
				if (order.current.length < 2 || isAnimatingRef.current) return

				isAnimatingRef.current = true

				let front: number
				let rest: number[]

				if (backward) {
					front = order.current[order.current.length - 1]
					rest = order.current.slice(0, -1)
				} else {
					;[front, ...rest] = order.current
				}

				const elFront = refs[front].current!
				const tl = gsap.timeline()
				tlRef.current = tl

				tl.to(elFront, {
					y: '+=500',
					duration: config.durDrop,
					ease: config.ease,
				})

				tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`)

				// Berechne neue Order um Slots richtig zu berechnen
				const newOrder = backward ? [front, ...rest] : [...rest, front]

				rest.forEach((idx, i) => {
					const el = refs[idx].current!
					const newIndex = newOrder.indexOf(idx)
					const slot = makeSlot(
						newIndex,
						cardDistance,
						verticalDistance,
						refs.length,
					)
					tl.set(el, { zIndex: slot.zIndex }, 'promote')
					tl.to(
						el,
						{
							x: slot.x,
							y: slot.y,
							z: slot.z,
							duration: config.durMove,
							ease: config.ease,
						},
						`promote+=${i * 0.15}`,
					)
				})

				const frontSlot = makeSlot(
					newOrder.indexOf(front),
					cardDistance,
					verticalDistance,
					refs.length,
				)

				tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`)
				tl.call(
					() => {
						gsap.set(elFront, { zIndex: frontSlot.zIndex })
					},
					undefined,
					'return',
				)
				tl.to(
					elFront,
					{
						x: frontSlot.x,
						y: frontSlot.y,
						z: frontSlot.z,
						duration: config.durReturn,
						ease: config.ease,
					},
					'return',
				)

				tl.call(() => {
					order.current = newOrder
					isAnimatingRef.current = false
				})
			}

			swapFunctionRef.current = swap

			if (autoSwap) {
				swap()
				intervalRef.current = window.setInterval(swap, delay)
			}

			if (pauseOnHover && autoSwap) {
				const node = container.current!
				const pause = () => {
					tlRef.current?.pause()
					clearInterval(intervalRef.current)
				}
				const resume = () => {
					tlRef.current?.play()
					intervalRef.current = window.setInterval(swap, delay)
				}
				node.addEventListener('mouseenter', pause)
				node.addEventListener('mouseleave', resume)
				return () => {
					node.removeEventListener('mouseenter', pause)
					node.removeEventListener('mouseleave', resume)
					clearInterval(intervalRef.current)
				}
			}
			return () => clearInterval(intervalRef.current)
		}, [
			cardDistance,
			verticalDistance,
			delay,
			pauseOnHover,
			skewAmount,
			easing,
			autoSwap,
		])

		const rendered = childArr.map((child, i) =>
			isValidElement<CardProps>(child)
				? cloneElement(child, {
						key: i,
						ref: refs[i],
						style: { width, height, ...(child.props.style ?? {}) },
						onClick: (e) => {
							child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>)
							onCardClick?.(i)
						},
					} as CardProps & React.RefAttributes<HTMLDivElement>)
				: child,
		)

		return (
			<div
				ref={container}
				className='card-swap-container'
				style={{ width, height }}
			>
				{rendered}
			</div>
		)
	},
)

CardSwap.displayName = 'CardSwap'

export default CardSwap
