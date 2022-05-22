// NEXT-UI INPUT
import Input from '@nextui-org/react/input'
import Loading from '@nextui-org/react/loading'

const InputForm = ({
	required,
	id,
	className,
	type,
	success,
	loading,
	error,
	disabled,
	underlined,
	bordered,
	clearable,
	placeholder,
	readOnly,
	label,
	value,
	initialValue,
	labelPlaceholder,
	size,
	color,
	status,
	helper,
	contentRight,
	labelRight,
	labelLeft,
	full,
	width,
	onChange,
	onBlur,
	password,
}) => {
	if (error) {
		color = 'error'
		status = 'error'
	} else if (success) {
		status = 'success'
		color = 'success'
	}

	if(password) type = 'password'

	return !password ? (
		<Input
			id={id}
			placeholder={placeholder}
			disabled={disabled}
			readOnly={readOnly}
			label={label}
			clearable={clearable || true}
			bordered={bordered}
			underlined={underlined}
			initialValue={initialValue}
			value={value}
			labelPlaceholder={labelPlaceholder}
			size={size || 'lg'}
			color={color}
			status={status}
			helperText={helper}
			helperColor={color}
			labelRight={labelRight}
			labelLeft={labelLeft}
			contentRight={loading ? <Loading size='xs' /> : contentRight}
			type={type}
			required={required}
			className={className}
			width={width}
			fullWidth={full}
			onChange={onChange}
			onBlur={onBlur}
		/>
	) : (
		<Input.Password
			id={id}
			placeholder={placeholder}
			disabled={disabled}
			readOnly={readOnly}
			label={label}
			bordered={bordered}
			underlined={underlined}
			initialValue={initialValue}
			value={value}
			labelPlaceholder={labelPlaceholder}
			size={size || 'lg'}
			color={color}
			status={status}
			helperText={helper}
			helperColor={color}
			labelRight={labelRight}
			labelLeft={labelLeft}
			type={type}
			required={required}
			className={className}
			width={width}
			fullWidth={full}
			onChange={onChange}
			onBlur={onBlur}
		/>
	)
}

export default InputForm
