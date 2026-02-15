import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		domains: ['picsum.photos'],
		qualities: [25, 50, 75, 100],
	},
}

export default nextConfig
