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

type IconProps = {
	name: string
	color: string
	size?: number
}

const Icon = ({ name, color, size }: IconProps) => {
	switch (name) {
		case 'chevron-left-rounded':
			return (
				<Lineicons
					icon={ChevronLeftCircleOutlined}
					color={color}
				/>
			)
		case 'arrow-left':
			return (
				<Lineicons
					icon={ArrowLeftOutlined}
					color={color}
				/>
			)
		case 'arrow-right':
			return (
				<Lineicons
					icon={ArrowRightOutlined}
					color={color}
				/>
			)
		case 'arrow-down':
			return (
				<Lineicons
					icon={ArrowDownwardOutlined}
					color={color}
					size={size}
				/>
			)
		case 'arrow-diagonal':
			return (
				<Lineicons
					icon={ArrowAngularTopRightOutlined}
					size={24}
					color={color}
				/>
			)
		case 'question-mark':
			return (
				<Lineicons
					icon={QuestionMarkCircleOutlined}
					color={color}
				/>
			)
		case 'bulb':
			return (
				<Lineicons
					icon={Bulb4Outlined}
					color={color}
				/>
			)
		case 'refresh':
			return (
				<Lineicons
					icon={RefreshCircle1ClockwiseOutlined}
					color={color}
				/>
			)
		case 'check':
			return (
				<Lineicons
					icon={CheckCircle1Outlined}
					color={color}
				/>
			)
		case 'cancel':
			return (
				<Lineicons
					icon={XmarkCircleOutlined}
					color={color}
				/>
			)
		case 'volume-high':
			return (
				<Lineicons
					icon={VolumeHighOutlined}
					color={color}
				/>
			)
		case 'volume-low':
			return (
				<Lineicons
					icon={VolumeLowOutlined}
					color={color}
				/>
			)
		case 'play':
			return (
				<Lineicons
					icon={PlayOutlined}
					color={color}
				/>
			)
		case 'pause':
			return (
				<Lineicons
					icon={PauseSolid}
					color={color}
				/>
			)
		default:
			return (
				<Lineicons
					icon={favicon}
					color={color}
				/>
			)
	}
}

export { Icon }
