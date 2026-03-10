import { Lineicons } from '@lineiconshq/react-lineicons'
import favicon from '../../app/favicon.svg'
import {
	ChevronLeftCircleOutlined,
	ArrowLeftOutlined,
	ArrowRightOutlined,
	ArrowDownwardOutlined,
	ArrowAngularTopRightOutlined,
	QuestionMarkCircleOutlined,
	Bulb4Outlined,
	RefreshCircle1ClockwiseOutlined,
	CheckCircle1Outlined,
	XmarkCircleOutlined,
	VolumeHighOutlined,
	VolumeLowOutlined,
	PlayOutlined,
	PauseSolid,
} from '@lineiconshq/free-icons'

const iconNames = [
	'chevron-left-rounded',
	'arrow-left',
	'arrow-right',
	'arrow-down',
	'arrow-diagonal',
	'question-mark',
	'bulb',
	'refresh',
	'check',
	'cancel',
	'volume-high',
	'volume-low',
	'play',
	'pause',
] as const

export type IconName = (typeof iconNames)[number]

type IconProps = {
	name: IconName
	color: string
	size?: number
	className?: string
}

const Icon = ({ name, color, size, className }: IconProps) => {
	switch (name) {
		case 'chevron-left-rounded':
			return (
				<Lineicons
					icon={ChevronLeftCircleOutlined}
					color={color}
					size={size}
					className={className}
				/>
			)
		case 'arrow-left':
			return (
				<Lineicons
					icon={ArrowLeftOutlined}
					color={color}
					size={size}
					className={className}
				/>
			)
		case 'arrow-right':
			return (
				<Lineicons
					icon={ArrowRightOutlined}
					color={color}
					size={size}
					className={className}
				/>
			)
		case 'arrow-down':
			return (
				<Lineicons
					icon={ArrowDownwardOutlined}
					color={color}
					size={size}
					className={className}
				/>
			)
		case 'arrow-diagonal':
			return (
				<Lineicons
					icon={ArrowAngularTopRightOutlined}
					color={color}
					size={size}
					className={className}
				/>
			)
		case 'question-mark':
			return (
				<Lineicons
					icon={QuestionMarkCircleOutlined}
					color={color}
					size={size}
					className={className}
				/>
			)
		case 'bulb':
			return (
				<Lineicons
					icon={Bulb4Outlined}
					color={color}
					size={size}
					className={className}
				/>
			)
		case 'refresh':
			return (
				<Lineicons
					icon={RefreshCircle1ClockwiseOutlined}
					color={color}
					size={size}
					className={className}
				/>
			)
		case 'check':
			return (
				<Lineicons
					icon={CheckCircle1Outlined}
					color={color}
					size={size}
					className={className}
				/>
			)
		case 'cancel':
			return (
				<Lineicons
					icon={XmarkCircleOutlined}
					color={color}
					size={size}
					className={className}
				/>
			)
		case 'volume-high':
			return (
				<Lineicons
					icon={VolumeHighOutlined}
					color={color}
					size={size}
					className={className}
				/>
			)
		case 'volume-low':
			return (
				<Lineicons
					icon={VolumeLowOutlined}
					color={color}
					size={size}
					className={className}
				/>
			)
		case 'play':
			return (
				<Lineicons
					icon={PlayOutlined}
					color={color}
					size={size}
					className={className}
				/>
			)
		case 'pause':
			return (
				<Lineicons
					icon={PauseSolid}
					color={color}
					size={size}
					className={className}
				/>
			)
		default:
			return (
				<Lineicons
					icon={favicon}
					color={color}
					size={size}
					className={className}
				/>
			)
	}
}

export { Icon }
