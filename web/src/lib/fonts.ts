import localFont from 'next/font/local'

const outward = localFont({
	src: [
		{
			path: '../../public/fonts/outward-block-webfont.woff2',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-outward',
})

const satoshi = localFont({
	src: [
		{
			path: '../../public/fonts/Satoshi-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Satoshi-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Satoshi-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Satoshi-Black.woff2',
			weight: '900',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Satoshi-Light.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Satoshi-Italic.woff2',
			weight: '400',
			style: 'italic',
		},
	],
	variable: '--font-satoshi',
})

export { outward, satoshi }
