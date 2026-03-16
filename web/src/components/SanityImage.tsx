import { FC } from 'react'
import Image, { ImageProps } from 'next/image'

export type SanityImageProps = Omit<ImageProps, 'loader'> & {
	disableSanityParams?: boolean
}

const addSanityParams = (src: ImageProps['src']) => {
	if (typeof src !== 'string') return src
	if (!src.includes('cdn.sanity.io')) return src

	try {
		const url = new URL(src)
		if (!url.searchParams.has('auto')) url.searchParams.set('auto', 'format')
		if (!url.searchParams.has('q')) url.searchParams.set('q', '72')
		return url.toString()
	} catch {
		return src
	}
}

export const SanityImage: FC<SanityImageProps> = ({
	alt,
	sizes,
	quality,
	loading,
	decoding,
	src,
	disableSanityParams,
	...props
}) => {
	const finalSrc = disableSanityParams ? src : addSanityParams(src)

	return (
		<Image
			src={finalSrc}
			alt={alt}
			quality={quality ?? 75}
			sizes={
				sizes ?? '(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 1200px'
			}
			loading={loading ?? 'lazy'}
			decoding={decoding ?? 'async'}
			{...props}
		/>
	)
}
