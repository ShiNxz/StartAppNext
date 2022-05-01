// Imports
import useUser from '@/data/useUser'
import SettingsInput from './Settings/Input'
import ImageInput from './Settings/ImageInput'
import InputAdornment from '@mui/material/InputAdornment'
import BlockTypes from '@/utils/page/Blocks'
import { ReactSortable } from 'react-sortablejs'
import { useEffect, useState, useContext, useCallback } from 'react'
import debounce from '@/utils/functions/Debounce'
import Axios from '@/utils/functions/Axios'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import { ProfileContext } from '@/pages/[user]'
import isEqual from 'lodash.isequal'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import Modal from '@/components/UI/Modal'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '../UI/Button'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const Title = ({ title, des }) => (
	<>
		<h5 className='settings_title mb-0'> {title} </h5>
		{des && <p className='text-center mb-6 text-sm text-gray-600'> {des} </p>}
	</>
)

const MainInformation = () => {
	const { loggedIn, user } = useUser()

	const settings = [
		{
			name: 'name',
			title: 'שם פרטי',
			initValue: user?.page?.name,
			helper: 'השם שיוצג בפרופיל',
			validate: (input) => {
				if (input === '') return 'יש להקליד שם'
				if (input === '123') return '123error'
				return true
			},
		},
		{
			name: 'title',
			title: 'תפקיד',
			initValue: user?.page?.title,
			helper: 'כותרת',
			validate: (input) => {
				if (input === '') return 'יש להקליד שם'
				if (input === '123') return '123error'
				return true
			},
		},
	]

	return (
		<>
			<Title
				title='הגדרות כלליות'
				des='פרטי זיהוי'
			/>
			{loggedIn ? (
				<>
					{settings.map((s) => (
						<SettingsInput
							key={s.name}
							name={s.name}
							title={s.title}
							initValue={s.initValue}
							helper={s.helper}
							validate={s.validate}
							className='!mb-12'
						/>
					))}
				</>
			) : (
				<>Loading...</>
			)}
			<Title
				title='כתובת מותאמת אישית'
				des='פרטי זיהוי'
			/>
			<SettingsInput
				name='customLink'
				title='כתובת מותאמת אישית'
				initValue={user?.page?.customLink}
				helper='לדוגמה: https://startapp.org.il/XXX'
				validate={(input) => {
					// !
					if (input === '') return 'יש להקליד שם'
					if (input.length >= 10) return 'ניתן לבחור כתובת בעלת מקסימום 10 תוים!'
					return true
				}}
				className='!mb-12 !w-full'
				InputProps={{ endAdornment: <InputAdornment position='end'>/startapp.org.il</InputAdornment> }}
				sx={{ direction: 'ltr' }}
			/>

			<Title title='פרטי קשר' />
			<Title title='רשתות חברתיות' />
		</>
	)
}

const BannerSettings = () => {
	return (
		<>
			<h1 className='settings_title'>תמונה</h1>
			<ImageInput name='avatar' />

			<h1 className='settings_title'>באנר</h1>
			<ImageInput name='banner' />
		</>
	)
}

const SettingsModal = ({ type, variables, close }) => {
	const SettingsComponent = BlockTypes.filter((block) => block.id === type)[0].settingsComponent
	return (
		<SettingsComponent
			variables={variables}
			close={close}
		/>
	)
}

const BlocksSettings = () => {
	const { user } = useUser()
	const { mutate } = useContext(ProfileContext)
	const [state, setState] = useState([])
	const [memory, setMemory] = useState([])
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState({
		show: false,
		message: '',
	})
	const [modal, setModal] = useState(false)
	const [confirm, setConfirm] = useState(false)
	const [addBlock, setAddBlock] = useState({ label: BlockTypes.name, id: BlockTypes[0].id })
	const [inputValue, setInputValue] = useState('')

	useEffect(() => {
		console.log(addBlock)
	}, [addBlock])

	useEffect(() => {
		user.page && setState(user.page.blocks)
	}, [user.page])

	useEffect(() => {
		const filteredBlocks = user.page.blocks.map(({ type, variables }) => ({ type, variables }))
		const filteredState = state.map(({ type, variables }) => ({ type, variables }))
		if (state.length < 1 || isEqual(filteredState, filteredBlocks) || (memory && isEqual(filteredState, memory)))
			return

		setAlert({
			show: false,
			message: '',
		})

		handleChange(filteredState)
	}, [state])

	const handleChange = useCallback(
		debounce(async (filteredState) => {
			setLoading(true)

			const { success, data } = await Axios(
				'/api/profile/edit',
				{ options: { blocksOrder: filteredState } },
				'POST'
			)

			setTimeout(() => {
				setLoading(false)

				if (success)
					setAlert({
						show: true,
						style: 'success',
						message: 'הבלוקים עודכנו בהצלחה!',
					})
				else
					setAlert({
						show: true,
						style: 'error',
						message: 'חלה שגיאה...',
					})
			}, 500)

			success && mutate && (await mutate())
			setMemory(filteredState)
		}, 500),
		[]
	)

	const deleteBlock = async (blockId) => {
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

	const addNewBlock = async () => {
		setLoading(true)
		const { success, data } = await Axios('/api/profile/edit', { options: { addBlock: addBlock.id } }, 'POST')

		setTimeout(() => {
			setLoading(false)
			if (success)
				setAlert({
					show: true,
					style: 'success',
					message: 'הבלוק נוסף בהצלחה!',
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
	}

	return (
		<>
			<Title
				title='סידור בלוקים'
				des='ניתן לגרור את הבלוקים על מנת לסדר אותם בדף, ניתן למחוק בלוק על ידי לחיצה על כפתור המחיקה, וניתן לערוך בלוק על ידי לחיצה על כפתור העריכה.'
			/>

			<div className='mb-12'>
				<ReactSortable
					list={state}
					setList={setState}
					animation={200}
					delayOnTouchStart={true}
					delay={2}
					className='grid gap-4 col-span-1'
					ghostClass='sort_ghost'
				>
					{state.map((item) => (
						<div
							className={`duration-200 w-full p-4 px-6 rounded-lg border border-dashed border-gray-700 ${
								item.chosen ? 'bg-gray-600 text-white border-gray-800' : 'bg-white'
							}`}
							key={item.type}
						>
							<div className='flex flex-row justify-between'>
								<span className='text-lg'>
									{BlockTypes.filter((block) => block.id === item.type)[0].name}
								</span>

								<div>
									<DeleteIcon
										className='cursor-pointer mx-1'
										onClick={() => setConfirm({ type: item.type })}
									/>
									<EditIcon
										className='cursor-pointer mx-1'
										onClick={() => setModal({ type: item.type, variables: item.variables })}
									/>
								</div>
							</div>
						</div>
					))}
				</ReactSortable>

				<Collapse
					in={alert.show || loading}
					sx={{ width: '100%', margin: 'auto', my: '20px' }}
				>
					{loading ? (
						<Box sx={{ width: '100%', margin: 'auto', my: '10px' }}>
							<LinearProgress />
						</Box>
					) : (
						alert.show && (
							<Alert
								severity={alert.style}
								sx={{ mb: 2 }}
							>
								{alert.message}
							</Alert>
						)
					)}
				</Collapse>
			</div>

			<Modal
				title='הגדרות בלוק'
				open={modal ? true : false}
				setOpen={setModal}
				maxWidth='md'
			>
				{modal && (
					<SettingsModal
						type={modal.type}
						variables={modal.variables}
						close={() => setModal(false)}
					/>
				)}
			</Modal>

			<Dialog
				open={confirm ? true : false}
				onClose={() => setConfirm(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>האם אתה בטוח שאתה מעוניין למחוק את הבלוק?</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>טקסט</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setConfirm(false)}>ביטול</Button>
					<Button
						onClick={() => deleteBlock(confirm.type)}
						autoFocus
					>
						אישור
					</Button>
				</DialogActions>
			</Dialog>

			<Title title='הוספת בלוק' />
			<Autocomplete
				disablePortal
				//value={addBlock?.label}
				onChange={(event, newValue) => {
					console.log('newValue', newValue)
					setAddBlock(newValue)
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue)
				}}
				id='combo-box'
				options={BlockTypes.map((b) => ({
					label: `${b.name} (${b.description})`,
					id: b.id,
				}))}
				sx={{ width: '100%' }}
				renderInput={(params) => (
					<TextField
						{...params}
						label='בחר בלוק'
					/>
				)}
			/>
			<Button
				style='cyan'
				className='w-full mt-4'
				onClick={addNewBlock}
			>
				הוספת בלוק
			</Button>
		</>
	)
}

const Tabs = [
	{
		name: 'הגדרות כלליות',
		component: <MainInformation />,
	},
	{
		name: 'תמונה ובאנר',
		component: <BannerSettings />,
	},
	{
		name: 'בלוקים',
		component: <BlocksSettings />,
	},
	{
		name: 'תמונה ובאנר 2',
		component: <BannerSettings />,
		bought: true,
	},
]

export default Tabs
