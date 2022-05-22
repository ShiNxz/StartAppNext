import UsernameInput from '@/components/Auth/Inputs/Name'
import EmailInput from '@/components/Auth/Inputs/Email'
import PasswordInput from '@/components/Auth/Inputs/Password'
import Button from '@/Next/Button'
import Spacer from '@nextui-org/react/spacer'

import Router from 'next/router'
import cookie from 'js-cookie'

import userContext from '@/data/UserContext'
import AppContext from '@/data/AppContext'

import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'

import { useState, useContext } from 'react'
import Axios from '@/utils/functions/Axios'

import Checkbox from '@/Next/Checkbox'

const Register = ({ setOpen }) => {
	// Inputs
	const [username, setUsername] = useState(false)
	const [email, setEmail] = useState(false)
	const [password, setPassword] = useState(false)
	const [rules, setRules] = useState(false)
	const [adverts, setAdverts] = useState(true)

	const [loading, setLoading] = useState(false)

	const { mutate } = useContext(userContext)
	const { loader } = useContext(AppContext)

	const [alert, setAlert] = useState({
		show: false,
		message: '',
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (email.status != 1 || username.status != 1 || password.status != 1)
			return setAlert({
				show: true,
				style: 'error',
				message: 'חלק מהפרטים חסרים',
			})

		if(!rules) return setAlert({
			show: true,
			style: "error",
			message: 'עליך לאשר את תנאי השימוש על מנת להמשיך בתהליך ההרשמה!'
		})

		setLoading(true)
		loader.start()

		const data = {
            email: email.value,
            username: username.value,
            password: password.value,
            adverts,
        }

        const { success, data: fetchedData, error } = await Axios('/api/auth/register', data, 'POST')

        success && !fetchedData.error ?
        (
            setAlert({
                show: true,
                style: "success",
                message: "המשתמש נוצר בהצלחה! אנא המתן..."
            }),

            setTimeout(() => {
                cookie.set('token', fetchedData.token, {expires: 30})
                Router.push(`/${username.value}`)
                mutate()
                setOpen && setOpen(false)
            }, 2000)
        ) :
            setAlert({
                show: true,
                style: "error",
                message: error
            })

		setLoading(false)
		loader.complete()
	}

	return (
		<form onSubmit={handleSubmit}>
			<Collapse in={alert.show}>
				<Alert
					severity={alert.style}
					sx={{ mb: 2 }}
				>
					{alert.message}
				</Alert>
			</Collapse>

			<UsernameInput
				title='שם משתמש'
				status={username}
				setStatus={setUsername}
			/>
			<EmailInput
				title='כתובת אימייל'
				status={email}
				setStatus={setEmail}
			/>
			<PasswordInput
				status={password}
				setStatus={setPassword}
			/>

			<Spacer />

			<Checkbox
				size='md'
				checked={rules}
				setChecked={setRules}
				color="success"
			>
				אני מאשר את <a className='duration-200 decoration-[#ffffff00] hover:decoration-neutral-500 underline decoration-1 hover:text-black'>
					תנאי השימוש
				</a>
			</Checkbox>
			<Checkbox
				size='md'
				checked={adverts}
				setChecked={setAdverts}
			>
				אני מאשר קבלת אימיילים על מבצעים ועדכונים <a className="duration-200 decoration-[#ffffff00] hover:decoration-neutral-500 underline decoration-1 hover:text-black">(מידע נוסף)</a>
			</Checkbox>

			<Spacer />

			<Button
				size='lg'
				className='!w-full my-4'
				loading={loading}
				type='submit'
				color='secondary'
			>
				הרשם
			</Button>
		</form>
	)
}

export default Register
