import NextCheckbox from '@nextui-org/react/Checkbox'
import Spacer from '@nextui-org/react/spacer'

const Checkbox = ({ checked, setChecked, children, size, color }) => {
	return (
		<>
			<NextCheckbox
				checked={checked}
				color={color}
				onChange={setChecked}
				size={size}
			>
				<span className='mr-1 text-base'>{children}</span>
			</NextCheckbox>
			<Spacer y='0.1'/>
		</>
	)
}

export default Checkbox
