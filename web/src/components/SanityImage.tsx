import { FC } from 'react'
import Image, { ImageProps } from 'next/image'

export type SanityImageProps = Omit<ImageProps, 'loader'>

export const SanityImage: FC<SanityImageProps> = (props) => {
	// Already included in ImageProps
	// eslint-disable-next-line jsx-a11y/alt-text
	return (
		<Image
			quality={100}
			{...props}
		/>
	)
}
