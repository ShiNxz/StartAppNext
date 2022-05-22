import { useState, useContext } from 'react'
import EmailInput from '@/components/Auth/Inputs/Email'
import Button from '@/Next/Button'
import Checkbox from '@/Next/Checkbox'
import TextArea from '@/Next/TextArea'
import Spacer from '@nextui-org/react/spacer'
import AppContext from '@/data/AppContext'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import Input from '@/Next/Input'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import topics from '@/utils/data/ContactUs'
import Axios from '@/utils/functions/Axios'

const Form = () => {
	// Inputs
	const [name, setName] = useState(false)
	const [email, setEmail] = useState(false)
	const [message, setMessage] = useState(false)

	const [topic, setTopic] = useState(0)

	const [newsletter, setNewsletter] = useState(false)

	const [loading, setLoading] = useState(false)
	const { loader } = useContext(AppContext)

	const [alert, setAlert] = useState({
		show: false,
		message: '',
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (email.status != 1 || name.length < 3 || message.length < 5)
			return setAlert({
				show: true,
				style: 'error',
				message: 'חלק מהפרטים חסרים',
			})

		setLoading(true)
		loader.start()

		const data = {
			email: email.value,
			name,
			message,
			topic,
			newsletter,
		}

		const { success, data: fetchedData, error } = await Axios('/api/contact', data, 'POST')

		success && !fetchedData.error
			? setAlert({
					show: true,
					style: 'success',
					message: 'הפנייה נשלחה בהצלחה!',
			  })
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

			<Input
				label='שם פרטי'
				onChange={(s) => setName(s.target.value.trim())}
				required={true}
				className='bg-white'
				bordered
			/>

			<Spacer />

			<EmailInput
				title='כתובת אימייל'
				status={email}
				setStatus={setEmail}
			/>

			<FormControl
				fullWidth
				variant='standard'
			>
				<InputLabel id='topic-select-label'>נושא</InputLabel>
				<Select
					value={topic}
					labelId='topic-select-label'
					label='נושא'
					onChange={(t) => setTopic(t.target.value)}
				>
					{topics.map((t, i) => (
						<MenuItem
							key={t}
							value={i}
						>
							{t}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<Spacer />

			<TextArea
				label='סיבת הפנייה'
				onChange={(s) => setMessage(s.target.value.trim())}
				placeholder='סיבת הפנייה, במידה ואתם מעוניינים לקבל הצעת מחיר, יש לרשום את פרטי האתר, שימוש ודוגמאות רלוונטיות'
				className='bg-white'
				bordered
				required
				full
			/>

			<Spacer />

			<Checkbox
				size='md'
				checked={newsletter}
				setChecked={setNewsletter}
			>
				אני מאשר קבלת אימיילים על מבצעים ועדכונים{' '}
				<a className='duration-200 decoration-[#ffffff00] hover:decoration-neutral-500 underline decoration-1 hover:text-black'>
					(מידע נוסף)
				</a>
			</Checkbox>

			<Spacer />

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

export default Form
