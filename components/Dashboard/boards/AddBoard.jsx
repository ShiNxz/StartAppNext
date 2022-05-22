import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import useUser from '@/data/useUser'

import { useState } from 'react'
import Axios from '@/utils/functions/Axios'

const AddModal = ({ open, setOpen }) => {
	const { mutate } = useUser()
	const [value, setValue] = useState('')

	const AddHandle = async () => {
		if (value === '') return
		const { success } = await Axios('/api/boards/add', { value }, 'POST')
		if (success) {
			await mutate()
			setOpen(false)
			setValue('')
		} else {
		}
	}

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
		>
			<DialogTitle>Subscribe</DialogTitle>
			<DialogContent>
				<DialogContentText>
					To subscribe to this website, please enter your email address here. We will send updates
					occasionally.
				</DialogContentText>
				<TextField
					autoFocus
					margin='dense'
					id='col_name'
					label='שם העמודה'
					type='text'
					fullWidth
					variant='standard'
					value={value}
					onChange={(v) => setValue(v.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)}>ביטול</Button>
				<Button onClick={AddHandle}>הוספת עמודה</Button>
			</DialogActions>
		</Dialog>
	)
}

const AddBoard = () => {
	const [open, setOpen] = useState(false)

	return (
		<>
			<div
				className='bg-blue-400/50 hover:bg-blue-400 duration-300 border-dashed border-2 border-blue-400 w-60 flex flex-col py-4 rounded-md px-4 mr-8 cursor-pointer justify-center'
				onClick={() => setOpen(true)}
			>
				<span className='text-white font-medium mb-1 text-center'>הוספת עמודה</span>
			</div>
			<AddModal
				open={open}
				setOpen={setOpen}
			/>
		</>
	)
}

export default AddBoard
