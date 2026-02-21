'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/custom/Icons'

interface Message {
	id: string
	text: string
	sender: 'user' | 'bot'
	timestamp: Date
}

export function ChatBot() {
	// TODO: chat zwischenspeichern, sodass wenn man die seite wechselt, der chat noch da ist
	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			text: 'Hallo! Wie kann ich dir helfen?',
			sender: 'bot',
			timestamp: new Date(),
		},
	])
	const [inputValue, setInputValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const messagesContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight
		}
	}, [messages])

	const handleSend = async () => {
		if (!inputValue.trim()) return

		const userMessage: Message = {
			id: Date.now().toString(),
			text: inputValue,
			sender: 'user',
			timestamp: new Date(),
		}

		setMessages((prev) => [...prev, userMessage])
		setInputValue('')
		setIsLoading(true)

		setTimeout(() => {
			const botMessage: Message = {
				id: (Date.now() + 1).toString(),
				text: 'Das ist eine Beispiel-Antwort. Hier wird später die AI-API integriert.',
				sender: 'bot',
				timestamp: new Date(),
			}
			setMessages((prev) => [...prev, botMessage])
			setIsLoading(false)
		}, 1000)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			e.stopPropagation()
			handleSend()
		}
	}

	return (
		<div className='w-full max-w-[60vw] h-150 flex flex-col bg-(--color-softLinen) rounded-lg shadow-lg overflow-hidden'>
			<div className='flex justify-between items-center bg-(--color-granite) text-(--color-softLinen) p-3 rounded-t-lg shrink-0'>
				<h4 className=''>Chat Assistent</h4>
				<Button
					// onClick={handlePrev}
					aria-label=''
					variant='ghost'
					className='w-fit h-fit hover:bg-transparent'
				>
					<Icon
						name='question-mark'
						color='#f3efe3'
						className='w-8! h-8!'
					/>
				</Button>
			</div>

			<div
				ref={messagesContainerRef}
				className='flex-1 overflow-y-auto p-4 space-y-4'
			>
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex ${
							message.sender === 'user' ? 'justify-end' : 'justify-start'
						}`}
					>
						<div
							className={`max-w-[70%] p-3 rounded-lg ${
								message.sender === 'user'
									? 'bg-(--color-granite) text-(--color-frost) break-words'
									: 'bg-(--color-frost) text-(--color-granite) break-words'
							}`}
						>
							<p className=''>{message.text}</p>
							<span className='text-xs opacity-70 mt-1 block'>
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
						<div className='bg-gray-200 text-gray-800 p-3 rounded-lg'>
							<span className='animate-pulse'>Tippt...</span>
						</div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			<div className='border-t p-4 bg-(--color-frost) flex gap-2 shrink-0'>
				<textarea
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder='Schreibe eine Nachricht...'
					className='flex-1 border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-(--color-granite)'
					rows={2}
					disabled={isLoading}
				/>
				<Button
					onClick={handleSend}
					disabled={!inputValue.trim() || isLoading}
					className='self-start'
				>
					<Icon
						name='arrow-right'
						color='white'
					/>
				</Button>
			</div>
		</div>
	)
}
