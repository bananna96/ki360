'use client'

import { useState, useRef, useEffect } from 'react'
import { Button, IconButton } from '@/components/ui/button'

interface Message {
	id: string
	text: string
	sender: 'user' | 'bot'
	timestamp: Date
}

interface ApiMessage {
	role: 'user' | 'assistant'
	content: string
}

export function ChatBot() {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			text: 'Hallo! Ich helfe dir dabei, bessere KI-Prompts zu schreiben. Schreib einen Prompt, den du üben möchtest!',
			sender: 'bot',
			timestamp: new Date(),
		},
	])
	const [inputValue, setInputValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [remaining, setRemaining] = useState<number | null>(null)
	const [error, setError] = useState<string | null>(null)
	const messagesContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight
		}
	}, [messages])

	const handleSend = async () => {
		if (!inputValue.trim() || isLoading) return

		setError(null)

		const userMessage: Message = {
			id: Date.now().toString(),
			text: inputValue,
			sender: 'user',
			timestamp: new Date(),
		}

		const updatedMessages = [...messages, userMessage]
		setMessages(updatedMessages)
		setInputValue('')
		setIsLoading(true)

		const apiMessages: ApiMessage[] = updatedMessages
			.filter((m) => m.id !== '1')
			.map((m) => ({
				role: m.sender === 'user' ? 'user' : 'assistant',
				content: m.text,
			}))

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages: apiMessages }),
			})

			const data = await res.json()

			if (!res.ok) {
				setError(data.error ?? 'Ein Fehler ist aufgetreten.')
				setIsLoading(false)
				return
			}

			setRemaining(data.remaining ?? null)
			setMessages((prev) => [
				...prev,
				{
					id: (Date.now() + 1).toString(),
					text: data.reply,
					sender: 'bot',
					timestamp: new Date(),
				},
			])
		} catch {
			setError('Netzwerkfehler. Bitte später erneut versuchen.')
		} finally {
			setIsLoading(false)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSend()
		}
	}

	return (
		<div className='w-full max-w-4xl h-[78vh] sm:h-[82vh] flex flex-col bg-(--color-softLinen) justify-center mx-auto rounded-lg shadow-lg overflow-hidden'>
			<div className='flex justify-between items-center bg-(--color-granite) text-(--color-softLinen) p-3 rounded-t-lg shrink-0'>
				<h4 className='text-sm sm:text-base'>Chat Assistent</h4>
				<div className='flex items-center gap-2'>
					{remaining !== null && (
						<span className='text-xs opacity-80 whitespace-nowrap'>
							{remaining} Anfragen übrig
						</span>
					)}
				</div>
			</div>

			<div
				ref={messagesContainerRef}
				className='flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4'
			>
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
					>
						<div
							className={`max-w-[88%] sm:max-w-[75%] p-3 rounded-lg ${
								message.sender === 'user'
									? 'bg-(--color-granite) text-(--color-frost)'
									: 'bg-(--color-frost) text-(--color-granite)'
							}`}
						>
							<p className='whitespace-pre-wrap wrap-break-word text-sm sm:text-base'>
								{message.text}
							</p>
							<span className='text-[11px] sm:text-xs opacity-70 mt-1 block'>
								{message.timestamp.toLocaleTimeString('de-DE', {
									hour: '2-digit',
									minute: '2-digit',
								})}
							</span>
						</div>
					</div>
				))}

				{isLoading && (
					<div className='flex justify-start'>
						<div className='bg-(--color-frost) text-(--color-granite) p-3 rounded-lg text-sm'>
							<span className='animate-pulse'>Tippt...</span>
						</div>
					</div>
				)}

				{error && (
					<div className='flex justify-center'>
						<div className='bg-red-100 text-red-700 p-3 rounded-lg text-sm text-center max-w-[95%] sm:max-w-[80%]'>
							{error}
						</div>
					</div>
				)}
			</div>

			<div className='border-t p-3 sm:p-4 bg-(--color-frost) flex gap-2 shrink-0 items-center'>
				<textarea
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder='Schreibe einen Prompt zum Üben...'
					className='flex-1 border rounded-lg p-2 text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-(--color-granite)'
					rows={2}
					disabled={isLoading}
				/>
				<IconButton
					onClick={handleSend}
					disabled={!inputValue.trim() || isLoading}
					icon='arrow-right'
					aria-label='Senden'
					iconColor='#492e19'
					iconSize={36}
					size='icon'
					className='-rotate-90'
					ariaLabel={'Senden'}
				/>
			</div>
		</div>
	)
}
