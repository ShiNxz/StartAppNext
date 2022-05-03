import Progress from './Progress'
import { useCallback, useEffect, useState } from 'react'
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

const SortBlocks = ({ user, state, setState, memory, setMemory, mutate }) => {
	const [loading, setLoading] = useState(false)
	const [confirm, setConfirm] = useState(false)
	const [modal, setModal] = useState(false)
	const [alert, setAlert] = useState({
		show: false,
		message: '',
	})

	useEffect(() => {
		console.log(state)
	}, [state])

	useEffect(() => {
		const filteredBlocks = user.page.blocks.map(({ key, type, variables }) => ({ key, type, variables }))
		const filteredState = state.map(({ key, type, variables }) => ({ key, type, variables }))
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
			setMemory(filteredState)
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
					list={state}
					setList={setState}
					animation={200}
					delay={2}
					className='grid gap-4 col-span-1'
					ghostClass='sort_ghost'
				>
					{state.map((item) => (
						<div
							className={`duration-200 w-full p-4 px-6 rounded-lg border border-dashed border-gray-700 ${
								item.chosen ? 'bg-gray-600 text-white border-gray-800' : 'bg-white'
							}`}
							key={item.key}
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
											setModal({ key: item.key, type: item.type, variables: item.variables, mutate })
										}
									/>
								</div>
							</div>
						</div>
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
				setMemory={setMemory}
				setState={setState}
				confirm={confirm}
				setConfirm={setConfirm}
			/>
		</>
	)
}

export default SortBlocks
