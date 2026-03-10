import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://ki360.info',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: 'https://ki360.info/wasistki',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: 'https://ki360.info/wasistki/technischemethodiken',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: 'https://ki360.info/prompten',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: 'https://ki360.info/prompten/chat',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
	]
}
