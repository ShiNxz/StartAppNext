import Axios from '@/utils/functions/Axios'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@/components/UI/Button'

const DeleteBlock = ({ setLoading, setAlert, mutate, setMemory, setState, confirm, setConfirm }) => {
	const Handler = async (blockId) => {
		setLoading(true)

		const { success, data } = await Axios('/api/profile/edit', { options: { deleteBlock: blockId } }, 'POST')

		setTimeout(() => {
			setLoading(false)

			if (success)
				setAlert({
					show: true,
					style: 'success',
					message: 'הבלוק נמחק בהצלחה!',
				})
			else
				setAlert({
					show: true,
					style: 'error',
					message: 'חלה שגיאה...',
				})
		}, 500)

		success && mutate && (await mutate())
		setMemory(data.message)
		setState(data.message)
		setConfirm(false)
	}

	return (
		<Dialog
			open={confirm ? true : false}
			onClose={() => setConfirm(false)}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
			className='p-12'
		>
			<DialogTitle id='alert-dialog-title'>האם אתה בטוח שאתה מעוניין למחוק את הבלוק?</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>טקסט</DialogContentText>
			</DialogContent>
			<DialogActions sx={{ padding: '1rem' }}>
				<Button
					style='cyan'
					onClick={() => setConfirm(false)}
				>
					ביטול
				</Button>
				<Button
					style='red'
					onClick={() => Handler(confirm.key)}
				>
					אישור
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default DeleteBlock
