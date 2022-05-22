import { Title } from '@/components/Page/Settings/Tabs'
import Collapse from '@mui/material/Collapse'
import { ReactSortable } from 'react-sortablejs'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useState, useCallback } from 'react'
import isEqual from 'lodash.isequal'
import debounce from '@/utils/functions/Debounce'
import Axios from '@/utils/functions/Axios'
import useUser from '@/data/useUser'

const ImageList = ({ images, blockId }) => {
	const [sort, setSort] = useState(images)
	const { mutate } = useUser()

	useEffect(() => {
		setSort(images)
	}, [images])

	useEffect(() => {
		sort = sort.map(({ file, title }) => ({ file, title }))
		images = images.map(({ file, title }) => ({ file, title }))

		if (sort.length < 1 || isEqual(images, sort)) return

		handleChange(sort)
	}, [sort])

	const handleChange = useCallback(
		debounce(async (sort) => {
			const { success } = await Axios('/api/profile/custom/editGallery', { blockId, options: { sort } }, 'POST')
			mutate()
		}, 500),
		[]
	)

	const handleDelete = async (file) => {
		const { success, data } = await Axios('/api/profile/custom/editGallery', { blockId, options: { delete: file } }, 'POST')
		await mutate()
		setSort(sort.filter((f) => f.file !== file))
	}

	return images.length > 0 ? (
		<div className='bg-slate-100 max-h-96 overflow-y-scroll text-center mb-2 border border-slate-300 rounded-md'>
			<Title
				title='תמונות'
				des='ניתן למחוק ולשנות את הסדר של התמונות ע"י גרירה'
			/>

			<ul className='flex justify-center items-center flex-col text-center mb-3 m-auto'>
				<ReactSortable
					list={sort}
					setList={setSort}
					animation={200}
					delay={2}
					ghostClass='sort_ghost'
				>
					{sort.map((i) => (
						<Collapse
							key={i.file}
							in={!!i}
							appear
						>
							<li
								key={i.file}
								className='flex flex-row mb-2 justify-between items-center w-96 duration-200 p-4 px-6 rounded-lg border border-dashed border-gray-700 bg-white'
							>
								<img
									src={`/uploads/${i.file}`}
									className='w-12 rounded-md'
									alt={i.title}
								/>
								<span>{i.title || 'ללא שם'}</span>
								<DeleteIcon
									className='cursor-pointer mx-1'
									onClick={() => handleDelete(i.file)}
								/>
							</li>
						</Collapse>
					))}
				</ReactSortable>
			</ul>
		</div>
	) : (
		<></>
	)
}

const DeleteModal = (id) => {
	return <></>
}

export default ImageList
