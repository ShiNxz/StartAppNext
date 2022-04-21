
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'

import Button from '@/components/UI/Button'
import UsernameInput from '@/components/UI/UsernameInput'
import PasswordInput from '@/components/UI/PasswordInput'

import axios from 'axios'
import Router from 'next/router'
import cookie from 'js-cookie'

import userContext from '@/data/UserContext'
import AppContext from '@/data/AppContext'

import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'

import { useState, useContext } from 'react'

const Login = ( props ) => {
    const [username, setUsername] = useState(false)
    const [password, setPassword] = useState(false)

    const { mutate } = useContext(userContext)
    const App = useContext(AppContext)

    const [alert, setAlert] = useState({
        show: false,
        message: ""
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        App.setProgress(30)
        console.time('test')

        const data = {
            identifier: username.input,
            password: password.input
        }
        await axios.post('/api/auth/login', data, {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            }
        })
        .then(({data}) => {
            setAlert({
                show: true,
                style: "success",
                message: "התחברת בהצלחה! אנא המתן..."
            })

            setTimeout(() => {
                cookie.set('token', data.token, { expires: 30 })
                Router.push('/dashboard')
                mutate()
                props.setOpen(false)
            }, 2000)
        })
        .catch((e) => {
            setAlert({
                show: true,
                style: "error",
                message: e.response.data.message
            })
        })
        App.setProgress(100)
    }

    const RegisterHandle = () => {
        props.setOpenRegister(true)
        props.setOpen(false)
    }

  return (
    <div>
        <Dialog
            open={props.open}
            keepMounted
            onClose={() => props.setOpen(false)}
            aria-describedby="alert-dialog-slide-description"
        >

            <div className="flex flex-col min-w-[30rem] max-w-xl px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-5">
                <div className="self-center mb-2 pb-2 text-xl font-semibold text-gray-800"> התחברות </div>

                    <Divider />

                    <div className="p-6 mt-4">
                        <form onSubmit={handleLogin}>

                            <Collapse in={alert.show}>
                                <Alert severity={alert.style} sx={{ mb: 2 }}>{alert.message}</Alert>
                            </Collapse>

                            <div className="flex flex-col mb-2 ">

                                <UsernameInput id="login_username" name="שם משתמש / כתובת אימייל" status={setUsername} />
                                <PasswordInput id="login_password" name="סיסמה" status={setPassword}/>

                            </div>

                            <div className="flex w-full my-4">
                                <Button className="w-full" style="purple">התחבר</Button>
                            </div>
                        </form>
                        
                    </div>

                    <Divider />

                    <div className="justify-center text-sm text-center text-gray-500 flex-items-center pt-6">
                        אין ברשותך משתמש? <a onClick={RegisterHandle} target="_blank" className="text-sm text-blue-500 underline hover:text-blue-700">הרשם</a>
                    </div>
            </div>

        </Dialog>
    </div>
  )
}

export default Login