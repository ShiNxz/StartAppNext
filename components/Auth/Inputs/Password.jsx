import Input from '@/Next/Input'
import Spacer from '@nextui-org/react/spacer'
import { isStrongPassword } from 'validator'

const PasswordInput = ({ status, setStatus }) => {
	// Security Checks
	const Check = (input) => {
		// Status = 1 - Valid, 0 - Invalid, -1 - Error
		setStatus({ value: input, status: 0, error: false })

		if (
			isStrongPassword(input, {
				minLength: 6,
				maxLength: 24,
				minLowercase: 1,
				minUppercase: 0,
				minNumbers: 1,
				minSymbols: 0,
			})
		)
			setStatus({
				value: input,
				status: 1,
				error: false,
			})
		else {
			setStatus({
				value: input,
				status: -1,
				error: 'יש לבחור סיסמה תקינה!',
			})
		}
	}

	return (
		<>
			<Input
				label='סיסמה'
				onChange={(s) => Check(s.target.value.trim())}
				required={true}
				helper={status.value?.length > 0 && status.error && status.error}
				error={status.value?.length > 0 && status.error && status.error}
				success={status.value?.length > 0 && status.status}
				password
				className='bg-white'
				width='400px'
				bordered
			/>
			<Spacer />
		</>
	)
}

export default PasswordInput
