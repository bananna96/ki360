import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getIconColor(color: string): string {
	// TODO: bessere Lösung?
	switch (color) {
		case '--color-softLinen':
			return '#f3efe3'
		case '--color-deepWalnut':
			return '#492e19'
		case '--color-granite':
			return '#5b6c5d'
		case '--color-skyBlue':
			return '#95cfff'
		case '--color-ochre':
			return '#db761c'
		case '--color-glossyBlack':
			return '#252324'
		case '--color-frost':
			return '#fcfbfc'
		default:
			return '#252324'
	}
}
