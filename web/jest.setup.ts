import '@testing-library/jest-dom'
import React from 'react'

jest.mock('@/components/custom/Icons', () => ({
	Icon: ({ name, className }: { name: string; className?: string }) => {
		return React.createElement('span', {
			'aria-hidden': 'true',
			className: className,
			'data-icon-name': name,
		})
	},
}))
