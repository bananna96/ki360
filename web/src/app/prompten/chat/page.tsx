import { ChatBot } from '@/components/custom/ChatBot'
import { Breadcrumbs } from '@/components/custom/Breadcrumbs'

export default async function Page() {
	return (
		<div className='w-screen px-4 pb-4'>
			<Breadcrumbs className='mb-4 md:mb-6' />
			<ChatBot />
		</div>
	)
}
