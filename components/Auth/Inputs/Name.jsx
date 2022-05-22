import Input from '@/Next/Input'
import Spacer from '@nextui-org/react/spacer'

const NameInput = ({ status, setStatus, title, width }) => {
	// Security Checks
	const Check = (input) => {
		// Status = 1 - Valid, 0 - Invalid, -1 - Error
		setStatus({ value: input, status: 0, error: false })

		if (input.length >= 4 && input.match(/[a-z]/i))
			setStatus({
				value: input,
				status: 1,
				error: false,
			})
		else {
			setStatus({
				value: input,
				status: -1,
				error: 'יש לבחור שם משתמש תקין!',
			})
		}
	}

	return (
		<>
			<Input
				label={title}
				onChange={(s) => Check(s.target.value.trim())}
				required={true}
				helper={status.value?.length > 0 && status.error && status.error}
				error={status.value?.length > 0 && status.error && status.error}
				success={status.value?.length > 0 && status.status}
				className='bg-white'
				width={width}
				bordered
			/>
			<Spacer />
		</>
	)
}

export default NameInput
