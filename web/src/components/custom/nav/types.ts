type NavSubItem = {
	text: string
	url: string
}

type NavLink = {
	text: string
	url?: string
	subitems?: NavSubItem[]
}

type MobileNavProps = {
	links: NavLink[]
	className?: string
}
export type { NavSubItem, NavLink, MobileNavProps }
