type CarouselData = {
	alt: string
	asset: {
		_id: string
		url: string
		metadata: {
			lqip: string
			dimensions: {
				width: number
				height: number
				aspectRatio: number
			}
		}
	}
	link: {
		text: string
		url: string
	}
}[]

export type { CarouselData }
