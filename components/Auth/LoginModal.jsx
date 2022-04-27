import Button from '@/components/UI/Button'
import UsernameInput from '@/components/Auth/UsernameInput'
import PasswordInput from '@/components/Auth/PasswordInput'

import Router from 'next/router'
import cookie from 'js-cookie'

import userContext from '@/data/UserContext'
import AppContext from '@/data/AppContext'

import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'

import { useState, useContext } from 'react'
import Axios from '@/utils/functions/Axios'
import Modal from './../UI/Modal';

const Login = ( props ) => {
    const [username, setUsername] = useState(false)
    const [password, setPassword] = useState(false)
	const [loading, setLoading] = useState(false)

    const { mutate } = useContext(userContext)
    const App = useContext(AppContext)

    const [alert, setAlert] = useState({
        show: false,
        message: ""
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        App.setProgress(30)
		setLoading(true)

        const data = {
            identifier: username.input,
            password: password.input
        }

        const { success, data: fetchedData, error } = await Axios('/api/auth/login', data, 'POST')
		
        success && !fetchedData.error ?
		(
            setAlert({
                show: true,
                style: "success",
                message: "התחברת בהצלחה! אנא המתן..."
            }),

            setTimeout(() => {
                cookie.set('token', fetchedData.token, { expires: 30 })
                Router.push('/dashboard')
                mutate()
                props.setOpen(false)
            }, 2000)
		) : 
            setAlert({
                show: true,
                style: "error",
                message: fetchedData.message || error.response.data.message
            })

		setLoading(false)
        App.setProgress(100)
    }

    const RegisterHandle = () => {
        props.setOpenRegister(true)
        props.setOpen(false)
    }

  	return (
        <Modal 
            title='התחברות'
            footer={<span>אין ברשותך משתמש? <a onClick={RegisterHandle} target="_blank" className="text-sm text-blue-500 underline hover:text-blue-700">הרשם</a></span>}
            open={props.open}
            setOpen={props.setOpen}
        >
    	    <form onSubmit={handleLogin}>
    	        <Collapse in={alert.show}>
    	            <Alert severity={alert.style} sx={{ mb: 2 }}>{alert.message}</Alert>
    	        </Collapse>
    	        <div className="flex flex-col mb-2 ">
    	            <UsernameInput loading={loading} id="login_username" name="שם משתמש / כתובת אימייל" status={setUsername} />
    	            <PasswordInput loading={loading} id="login_password" name="סיסמה" status={setPassword}/>
    	        </div>
    	        <div className="flex w-full my-4">
    	            <Button loading={loading} className="w-full" style="cyan">התחבר</Button>
    	        </div>
    	    </form>
        </Modal>
  	)
}

export default Login