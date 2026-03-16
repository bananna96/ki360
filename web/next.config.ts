import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactCompiler: true,
	reactStrictMode: true,
	productionBrowserSourceMaps: true,
	images: {
		qualities: [25, 50, 75, 100],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
			},
		],
	},
}

export default nextConfig
