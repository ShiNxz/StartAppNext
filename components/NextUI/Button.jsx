import NextButton from '@nextui-org/react/button'
import Loading from '@nextui-org/react/loading'

const Button = ({
	children,
	disabled,
	size,
	color,
	shadow,
	loading,
	bordered,
	rounded,
	ghost,
	flat,
	light,
	icon,
	className,
	type,
	as,
	onClick,
	css
}) => {
	return (
		<NextButton
			disabled={disabled || loading}
			size={size || 'md'}
			color={color || 'primary'}
			shadow={shadow}
			bordered={bordered}
			rounded={rounded}
			ghost={ghost}
			flat={flat}
			light={light}
			iconRight={
				loading ? (
					<Loading
						color='currentColor'
						size='xs'
						className=''
					/>
				) : (
					icon
				)
			}
			className={className}
			type={type}
			as={as}
			onClick={onClick}
			css={css}
		>
			{loading ? 'אנא המתן...' : children}
		</NextButton>
	)
}

export default Button
