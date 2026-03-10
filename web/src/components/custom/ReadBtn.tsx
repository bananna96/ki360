'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Icon } from './Icons'

type Props = {
	text: string
	lang?: string
	className?: string
}

export function ReadButton({ text, lang = 'de-DE', className }: Props) {
	const [isSpeaking, setIsSpeaking] = useState(false)

	const handleToggle = () => {
		if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

		if (isSpeaking) {
			window.speechSynthesis.cancel()
			setIsSpeaking(false)
			return
		}

		const utterance = new SpeechSynthesisUtterance(text)
		utterance.lang = lang
		utterance.rate = 1
		utterance.pitch = 1

		utterance.onend = () => setIsSpeaking(false)
		utterance.onerror = () => setIsSpeaking(false)

		window.speechSynthesis.cancel()
		window.speechSynthesis.speak(utterance)
		setIsSpeaking(true)
	}

	return (
		<Button
			type='button'
			variant='ghost'
			onClick={handleToggle}
			className='w-fit p-0!'
		>
			<Icon
				name={isSpeaking ? 'volume-low' : 'volume-high'}
				color='#5b6c5d'
				size={48}
				className={className}
			/>
		</Button>
	)
}
