import { useState } from 'react'

import Axios from '@/utils/functions/Axios'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import BlockTypes from '@/utils/page/Blocks'
import { Title } from './../Tabs'
import React from 'react'
import Button from '@/components/UI/Button'
import Collapse from '@mui/material/Collapse'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'

const AddNewBlock = ({ mutate, setState }) => {
	const [addBlock, setAddBlock] = useState({ label: BlockTypes.name, id: BlockTypes[0].id })
	const [inputValue, setInputValue] = useState('')
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState({
		show: false,
		message: '',
	})

	const Handler = async () => {
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
	}

	return (
		<>
			<Title title='הוספת בלוק' />

			<Autocomplete
				disablePortal
				//value={addBlock?.label}
				onChange={(event, newValue) => setAddBlock(newValue)}
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
				onClick={Handler}
				loading={loading}
			>
				הוספת בלוק
			</Button>

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
		</>
	)
}

export default AddNewBlock
