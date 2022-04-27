import { useState, useContext } from 'react'

import Checkbox from '@mui/material/Checkbox'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import FormControlLabel from '@mui/material/FormControlLabel'

import Button from '@/components/UI/Button'
import UsernameInput from '@/components/Auth/UsernameInput'
import EmailInput from '@/components/Auth/EmailInput'
import PasswordInput from '@/components/Auth/PasswordInput'

import Router from 'next/router'
import cookie from 'js-cookie'

import userContext from '@/data/UserContext'
import AppContext from '@/data/AppContext'
import Axios from '@/utils/functions/Axios'
import Modal from '../UI/Modal'

const Register = ( props ) => {
    const [username, setUsername] = useState(false)
    const [email, setEmail] = useState(false)
    const [password, setPassword] = useState(false)
    const [rules, setRules] = useState(false)
    const [adverts, setAdverts] = useState(true)
    const [loading, setLoading] = useState(false)

    const { mutate } = useContext(userContext)
    const App = useContext(AppContext)

    const [alert, setAlert] = useState({ show: false })

    const handleRegister = async (e) => {
        e.preventDefault()
        
        if(!rules) return setAlert({
            show: true,
            style: "error",
            message: 'עליך לאשר את תנאי השימוש על מנת להמשיך בתהליך ההרשמה!'
        })

        App.setProgress(30)
        setLoading(true)

        const data = {
            email: email.input,
            username: username.input,
            password: password.input,
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
                Router.push('/')
                mutate()
                props.setOpen(false)
            }, 2000)
        ) :
            setAlert({
                show: true,
                style: "error",
                message: fetchedData.message || error.response.data.message
            })
        
        App.setProgress(100)
        setLoading(false)
    }

    const LoginHandle = () => {
        props.setOpenLogin(true)
        props.setOpen(false)
    }

    return (
        <Modal 
            title='הרשמה ופתיחת דף אישי'
            footer={<span>יש ברשותך כבר משתמש? <a onClick={LoginHandle} target="_blank" className="text-sm text-blue-500 underline hover:text-blue-700">התחבר</a></span>}
            open={props.open}
            setOpen={props.setOpen}
        >
            <form onSubmit={handleRegister}>
                <Collapse in={alert.show}>
                    <Alert severity={alert.style} sx={{ mb: 2 }}>{alert.message}</Alert>
                </Collapse>

                <div className="flex flex-col mb-2 ">

                    <UsernameInput loading={loading} id="username" name="שם משתמש" status={setUsername} />
                    <EmailInput loading={loading} id="email" name="כתובת אימייל" status={setEmail}/>
                    <PasswordInput loading={loading} id="password" name="סיסמה" status={setPassword}/>

                    <FormControlLabel control={<Checkbox checked={rules} onChange={() => setRules(!rules)} />} label={<div className='text-neutral-600'> <span>אני מאשר את </span> <a className="duration-200 decoration-[#ffffff00] hover:decoration-neutral-500 underline decoration-1 hover:text-black">תנאי השימוש</a></div>} />
                    <FormControlLabel control={<Checkbox checked={adverts} onChange={() => setAdverts(!adverts)} />} label={<div className='text-neutral-600'> <span>אני מאשר קבלת אימיילים על מבצעים ועדכונים </span> <a className="duration-200 decoration-[#ffffff00] hover:decoration-neutral-500 underline decoration-1 hover:text-black">(מידע נוסף)</a></div>} />

                </div>

                <div className="flex w-full my-4">
                    <Button loading={loading} className="w-full" style="blue">הרשם</Button>
                </div>
            </form>
        </Modal>   
    )
}

export default Register