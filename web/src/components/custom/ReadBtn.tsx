'use client'

import { useEffect, useState } from 'react'
import { IconButton } from '@/components/ui/button'

type Props = {
	text: string
	lang?: string
	className?: string
	disabled?: boolean
}

export function ReadButton({
	text,
	lang = 'de-DE',
	className,
	disabled = false,
}: Props) {
	const [isSpeaking, setIsSpeaking] = useState(false)

	useEffect(() => {
		return () => {
			if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
				window.speechSynthesis.cancel()
			}
		}
	}, [])

	const handleToggle = () => {
		if (disabled || !text?.trim()) return
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
		<IconButton
			type='button'
			variant='ghost'
			onClick={handleToggle}
			disabled={disabled}
			icon={isSpeaking ? 'volume-low' : 'volume-high'}
			ariaLabel={isSpeaking ? 'Vorlesen stoppen' : 'Text vorlesen'}
			iconColor='#5b6c5d'
			iconSize={36}
			className={`w-fit p-0! ${className ?? ''}`}
		/>
	)
}
