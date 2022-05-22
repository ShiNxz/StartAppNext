// NEXT-UI INPUT
import Textarea from '@nextui-org/react/Textarea'
import Loading from '@nextui-org/react/Loading'

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
	rows,
}) => {
	if (error) {
		color = 'error'
		status = 'error'
	} else if (success) {
		status = 'success'
		color = 'success'
	}

	return (
		<Textarea
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
			rows={rows}
		/>
	)
}

export default InputForm
