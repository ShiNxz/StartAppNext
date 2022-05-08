import { useState, useContext } from 'react'
import { ProfileContext } from '@/pages/[user]'

import Button from '@/UI/Button'
import Axios from '@/utils/functions/Axios'

import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import useUser from '@/data/useUser'

const ImageInput = ({ name, formats, multiple, blockId, setImages }) => {
	const { mutate } = useUser()
	const { mutate: reset } = useContext(ProfileContext)

	const [selectedFiles, setSelectedFiles] = useState(null)

	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState({
		show: false,
		message: '',
	})

	const handleSubmit = async (event) => {
		event.preventDefault()
		setLoading(true)
		setAlert({
			show: false,
			message: '',
		})

		const formData = new FormData()

		for (let i = 0; i < selectedFiles.length; i++) {
			formData.append(blockId ? `${blockId}:${i}` : `${name}:${i}`, selectedFiles[i])
		}

		const { success, data } = await Axios(`/api/profile/${name}`, formData, 'POST', 'multipart/form-data')

		setTimeout(async () => {
			if (success)
				setAlert({
					show: true,
					style: 'success',
					message: selectedFiles.length > 1 ? 'התמונות נוספו בהצלחה!' : 'התמונה נוספה בהצלחה!',
				})
			else
				setAlert({
					show: true,
					style: 'error',
					message: 'חלה שגיאה...',
				})

			if (setImages && success) setImages(data.message)
			mutate && (await mutate())
			reset && (await reset())
			setLoading(false)
		}, 2000)
	}

	return (
		<>
			<Collapse in={alert.show}>
				<Alert
					severity={alert.style}
					sx={{ width: '24rem', margin: 'auto', mb: 2 }}
				>
					{alert.message}
				</Alert>
			</Collapse>
			<form onSubmit={handleSubmit}>
				<div className='flex justify-center items-center flex-col text-center mb-3 w-96 m-auto'>
					<input
						className='
                        	block
                        	w-full
                        	px-3
                        	py-1.5
                        	text-base
                        	font-normal
                        	text-gray-700
                        	bg-white bg-clip-padding
                        	border border-solid border-gray-300
                        	rounded
                        	transition
                        	ease-in-out
                        	m-0
                        	focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
						type='file'
						id='formFile'
						onChange={() => setSelectedFiles(event.target.files)}
						accept={formats.map((f) => `image/${f}`).join(', ')}
						multiple={multiple}
					/>
				</div>

				<Collapse in={loading}>
					<Box sx={{ width: '24rem', margin: 'auto', mb: '10px' }}>
						<LinearProgress />
					</Box>
				</Collapse>

				<Button
					disabled={!selectedFiles}
					loading={loading}
					type='submit'
					className='w-96 m-auto mb-10'
				>
					{selectedFiles ? 'שמירה' : 'יש לבחור קובץ'}
				</Button>
			</form>
		</>
	)
}

export default ImageInput
