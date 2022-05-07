import Progress from './Progress'
import { forwardRef, useCallback, useEffect, useState, useRef } from 'react'
import isEqual from 'lodash.isequal'
import debounce from '@/utils/functions/Debounce'
import Axios from '@/utils/functions/Axios'
import { Title } from './../Tabs'
import { ReactSortable } from 'react-sortablejs'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import BlockTypes from '@/utils/page/Blocks'
import EditBlock from './EditBlock'
import DeleteBlock from './DeleteBlock'
import Collapse from '@mui/material/Collapse'
import { TransitionGroup } from 'react-transition-group'

const SortBlocks = ({ state, setState, mutate }) => {
	const [loading, setLoading] = useState(false)
	const [confirm, setConfirm] = useState(false)
	const [modal, setModal] = useState(false)
	const [alert, setAlert] = useState({
		show: false,
		message: '',
	})
	const [sort, setSort] = useState([])
	const nodeRef = useRef(null)

	useEffect(() => {
		setSort(state.map(({ key, type, variables }) => ({ key, type, variables })))
	}, [state])

	useEffect(() => {
		sort = sort.map(({ key, type, variables }) => ({ key, type, variables }))
		if (sort.length < 1 || isEqual(state, sort)) return
		console.log(isEqual(state, sort), state, sort)

		setAlert({
			show: false,
			message: '',
		})

		handleChange(sort)
	}, [sort])

	const handleChange = useCallback(
		debounce(async (state) => {
			setLoading(true)
			const { success, data } = await Axios('/api/profile/edit', { options: { blocksOrder: state } }, 'POST')

			setTimeout(() => {
				setLoading(false)

				if (success)
					setAlert({
						show: true,
						style: 'success',
						message: data.message,
					})
				else
					setAlert({
						show: true,
						style: 'error',
						message: 'חלה שגיאה...',
					})
			}, 500)

			success && mutate && (await mutate())
			console.log('state', state)
		}, 500),
		[]
	)

	return (
		<>
			<Title
				title='סידור בלוקים'
				des='ניתן לגרור את הבלוקים על מנת לסדר אותם בדף, ניתן למחוק בלוק על ידי לחיצה על כפתור המחיקה, וניתן לערוך בלוק על ידי לחיצה על כפתור העריכה.'
			/>

			<div className='mb-12'>
				<ReactSortable
					list={sort}
					setList={setSort}
					animation={200}
					delay={2}
					className='grid gap-4 col-span-1'
					ghostClass='sort_ghost'
				>
					{sort.map((item) => (
						<Collapse
							key={item.key}
							in={!!item}
							appear
						>
							<div
								className={`duration-200 w-full p-4 px-6 rounded-lg border border-dashed border-gray-700 ${
									item.chosen ? 'bg-gray-600 text-white border-gray-800' : 'bg-white'
								}`}
							>
								<div className='flex flex-row justify-between'>
									<span className='text-lg'>
										{BlockTypes.filter((block) => block.id === item.type)[0].name}
									</span>

									<div>
										<DeleteIcon
											className='cursor-pointer mx-1'
											onClick={() => setConfirm({ key: item.key })}
										/>
										<EditIcon
											className='cursor-pointer mx-1'
											onClick={() =>
												setModal({
													key: item.key,
													type: item.type,
													variables: item.variables,
													mutate,
												})
											}
										/>
									</div>
								</div>
							</div>
						</Collapse>
					))}
				</ReactSortable>

				<Progress
					alert={alert}
					loading={loading}
				/>
			</div>
			<EditBlock
				modal={modal}
				setModal={setModal}
			/>
			<DeleteBlock
				setLoading={setLoading}
				setAlert={setAlert}
				mutate={mutate}
				setState={setState}
				confirm={confirm}
				setConfirm={setConfirm}
			/>
		</>
	)
}

export default SortBlocks
