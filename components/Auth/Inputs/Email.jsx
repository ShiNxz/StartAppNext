import { isEmail } from 'validator'
import Input from '@/Next/Input'
import Spacer from '@nextui-org/react/Spacer'

const EmailInput = ({ status, setStatus, title }) => {
	// Security Checks
	const Check = (input) => {
		// Status = 1 - Valid, 0 - Invalid, -1 - Error
		setStatus({ value: input, status: 0, error: false })

		if (isEmail(input.trim()) && input.match(/[a-z]/i))
			setStatus({
				value: input,
				status: 1,
				error: false,
			})
		else {
			setStatus({
				value: input,
				status: -1,
				error: 'יש לבחור כתובת אימייל תקינה!',
			})
		}
	}

	return (
		<>
			<Input
				label={title}
				onChange={(s) => Check(s.target.value.trim().toLowerCase())}
				required={true}
				helper={status.value?.length > 0 && status.error && status.error}
				error={status.value?.length > 0 && status.error && status.error}
				success={status.value?.length > 0 && status.status}
				className='bg-white'
				width='300px'
				bordered
			/>
			<Spacer />
		</>
	)
}

export default EmailInput
