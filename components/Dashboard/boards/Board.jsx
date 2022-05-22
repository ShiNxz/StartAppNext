import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import isEqual from 'lodash.isequal'

import useUser from '@/data/useUser'

import Axios from '@/utils/functions/Axios'
import { useState, useCallback, useEffect, useMemo } from 'react'

import Collapse from '@mui/material/Collapse'
import { ReactSortable } from 'react-sortablejs'
import debounce from '@/utils/functions/Debounce'

const Note = ({ children }) => {
	return (
		<Collapse
			appear
			in={!!children}
		>
			<div className='bg-white rounded-md text-center p-4 shadow-md mb-3'>{children}</div>
		</Collapse>
	)
}

const Board = ({ name, color, board, list, setList, index, mutate }) => {
	const [open, setOpen] = useState(false)
	const [sort, setSort] = useState([])

	console.log(list)
	useEffect(() => {
		if (sort.length < 1 || isEqual(sort, list[index].notes)) return
		const newList = list
		list[index].notes = sort
		setList(newList)
		console.log(list)
		handleChange(
			index,
			sort.map(({ title, description, tags }) => ({ title, description, tags }))
		)
	}, [sort])

	const handleChange = useCallback(
		debounce(async (index, sort) => {
			const { success, data } = await Axios('/api/boards/sort', { index, sort }, 'POST')

			success && mutate && (await mutate())
		}, 500),
		[]
	)

	return (
		<>
			<div className='bg-blue-400 w-60 flex flex-col py-4 rounded-md px-4 mr-8'>
				<span className='text-white font-medium mb-1'>{name}</span>
				{list.length > 0 ? <ReactSortable
					list={list[index].notes}
					setList={setSort}
					animation={200}
					delay={2}
					ghostClass='sort_ghost'
					group='shared'
				>
					{list[index].notes.map((n) => (
						<Note key={n.title}>{n.title}</Note>
					))}
				</ReactSortable> : <></>}
				<div
					className='bg-white/15 hover:bg-white/25 hover:shadow-lg duration-300 border-dashed border-2 rounded-md text-center p-4 py-2 shadow-md mb-2 text-white cursor-pointer'
					onClick={() => setOpen(true)}
				>
					הוספת פתק
				</div>
			</div>
			<AddModal
				open={open}
				setOpen={setOpen}
				board={board}
			/>
		</>
	)
}

const AddModal = ({ open, setOpen, board }) => {
	const { mutate } = useUser()
	const [value, setValue] = useState('')

	const AddHandle = async () => {
		if (value === '') return
		const { success } = await Axios('/api/boards/addNote', { board, value }, 'POST')
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
			<DialogTitle>הוספת פתק</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin='dense'
					id='note_name'
					label='שם הפתק'
					type='text'
					fullWidth
					variant='standard'
					value={value}
					onChange={(v) => setValue(v.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)}>ביטול</Button>
				<Button onClick={AddHandle}>הוספת פתק</Button>
			</DialogActions>
		</Dialog>
	)
}

export default Board
