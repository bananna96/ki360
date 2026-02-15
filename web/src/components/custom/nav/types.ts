interface NavLink {
	text: string
	url: string
}

interface MobileNavProps {
	links: NavLink[]
	className?: string
}
export type { NavLink, MobileNavProps }
