import '@testing-library/jest-dom'

jest.mock('@/components/custom/Icons', () => ({
	Icon: ({ name, className }: { name: string; className?: string }) => {
		const React = require('react')
		return React.createElement('span', {
			'aria-hidden': 'true',
			className: className,
			'data-icon-name': name,
		})
	},
}))
