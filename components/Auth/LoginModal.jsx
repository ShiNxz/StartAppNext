import Modal from '@/components/UI/Modal'
import LoginComponent from '@/components/Auth/Login'

const Login = ({ setOpenRegister, open, setOpen }) => {
	const RegisterHandle = () => {
		setOpenRegister(true)
		setOpen(false)
	}

	return (
		<Modal
			title='התחברות'
			footer={
				<span>
					אין ברשותך משתמש?
					<a
						onClick={RegisterHandle}
						target='_blank'
						className='text-sm text-blue-500 underline hover:text-blue-700 mr-1'
					>
						הרשם
					</a>
				</span>
			}
			open={open}
			setOpen={setOpen}
		>
			<LoginComponent setOpen={setOpen}/>
		</Modal>
	)
}

export default Login
