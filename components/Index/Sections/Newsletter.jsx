import bg_features_secondary from '@/public/assets/bg_features_secondary.png'
import Input from '@nextui-org/react/Input'
import Button from '@/Next/Button'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useState, useContext } from 'react'
import Axios from '@/utils/functions/Axios'
import AppContext from '@/data/AppContext'
import { useSnackbar } from 'notistack'

const Newsletter = () => {
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [submitted, setSubmitted] = useState(false) // check initially if already submited by the local storage
	const { enqueueSnackbar } = useSnackbar()

	const { loader } = useContext(AppContext)

	const handleSubmit = async () => {
		loader.start()

		const { success } = await Axios('/api/newsletter', { email }, 'POST')
		success && enqueueSnackbar('נוספת לרשימה!', { variant: 'success' })

		setLoading(false)
		setSubmitted(true)
		loader.complete()
	}

	return (
		<div className='relative text-center py-8 bg-slate-200'>
			<span className='font-medium text-2xl block'>קבל עדכונים</span>
			<span className='font-normal text-sm'>הרשם לקבלת עדכונים על מבצעים, פוסטים חדשים, וכו'</span>
			<div className='container z-20 my-8 px-12 relative'>
				<div className='flex flex-row place-content-center'>
					<Input
						size='lg'
						placeholder='כתובת אימייל'
						className='!w-96 shadow-lg'
						css={{ $$inputColor: '#fff' }}
						aria-label='כתובת אימייל'
						value={email}
						onChange={(v) => setEmail(v.target.value)}
						disabled={submitted}
					/>
					<Button
						size='lg'
						className='mr-2'
						color='secondary'
						onClick={handleSubmit}
						loading={loading}
						disabled={submitted}
						shadow
					>
						{submitted ? (
							'נוספת לרשימה!'
						) : (
							<>
								קבל עדכונים <KeyboardBackspaceIcon className='mr-3' />
							</>
						)}
					</Button>
				</div>
			</div>
			<div
				style={{ backgroundImage: `url(${bg_features_secondary.src})` }}
				className='bg-cover bg-center h-full w-full opacity-[.10] absolute inset-0 z-0'
			/>
		</div>
	)
}

export default Newsletter
