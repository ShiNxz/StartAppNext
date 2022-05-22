// import Button from '@/components/UI/Button'
import UsernameInput from '@/components/Auth/Inputs/Name'
import PasswordInput from '@/components/Auth/Inputs/Password'
import Button from '@/Next/Button'

import Router from 'next/router'
import cookie from 'js-cookie'

import userContext from '@/data/UserContext'
import AppContext from '@/data/AppContext'

import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'

import { useState, useContext } from 'react'
import Axios from '@/utils/functions/Axios'

const Login = ({ setOpen }) => {
	const [username, setUsername] = useState(false)
	const [password, setPassword] = useState(false)
	const [loading, setLoading] = useState(false)

	const { mutate } = useContext(userContext)
	const { loader } = useContext(AppContext)

	const [alert, setAlert] = useState({
		show: false,
		message: '',
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (username.status != 1 || password.status != 1)
			return setAlert({
				show: true,
				style: 'error',
				message: 'חלק מהפרטים חסרים',
			})

		const data = {
			identifier: username.value,
			password: password.value,
		}

		setLoading(true)
		loader.start()

		const { success, data: fetchedData, error } = await Axios('/api/auth/login', data, 'POST')

		success && !fetchedData.error
			? (setAlert({
					show: true,
					style: 'success',
					message: 'התחברת בהצלחה! אנא המתן...',
			  }),
			  setTimeout(() => {
					cookie.set('token', fetchedData.token, { expires: 30 })
					Router.push('/dashboard')
					mutate()
					setOpen && setOpen(false)
			  }, 2000))
			: setAlert({
					show: true,
					style: 'error',
					message: error,
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
				title='שם משתמש / כתובת אימייל'
				status={username}
				setStatus={setUsername}
				width='300px'
			/>
			<PasswordInput
				status={password}
				setStatus={setPassword}
			/>

			<Button
				size='lg'
				className='!w-full my-4'
				loading={loading}
				type='submit'
			>
				התחבר
			</Button>
		</form>
	)
}

export default Login
