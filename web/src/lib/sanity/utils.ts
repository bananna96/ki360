import { createImageUrlBuilder, SanityImageSource } from '@sanity/image-url'
import type { Image } from 'sanity'

const imageBuilder = createImageUrlBuilder({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
})

// 1. Returns the builder. Used by our sanityLoader (Step 2)
export const urlFor = (source: SanityImageSource) => imageBuilder.image(source)

// 2. Returns a URL string. Also used for Metadata/OG Images where we can't use next/image
export const urlForImage = (image: Image, width?: number) => {
	const builder = urlFor(image)

	if (width) {
		return builder.width(width).url()
	}
	return builder.url()
}

import { ImageLoaderProps } from 'next/image'

export default function sanityLoader({
	src,
	width,
	quality,
}: ImageLoaderProps) {
	return urlFor(src)
		.width(width)
		.quality(quality || 75)
		.auto('format') // Serves WebP or AVIF based on browser support
		.fit('max')
		.url()
}
