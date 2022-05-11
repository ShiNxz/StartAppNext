import RegisterComponent from '@/components/Auth/Register'
import Modal from '../UI/Modal'

const Register = ({ setOpenLogin, open, setOpen}) => {

    const LoginHandle = () => {
        setOpenLogin(true)
        setOpen(false)
    }

    return (
        <Modal 
            title='הרשמה ופתיחת דף אישי'
            footer={<span>יש ברשותך כבר משתמש? <a onClick={LoginHandle} target="_blank" className="text-sm text-blue-500 underline hover:text-blue-700">התחבר</a></span>}
            open={open}
            setOpen={setOpen}
        >
			<RegisterComponent setOpen={setOpen}/>
        </Modal>   
    )
}

export default Register