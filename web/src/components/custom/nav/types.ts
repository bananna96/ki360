interface NavLink {
	name: string
	href: string
}

interface NavProps {
	links: NavLink[]
}

interface MobileNavProps {
	links: NavLink[]
	className?: string
}
export type { NavProps, MobileNavProps }
