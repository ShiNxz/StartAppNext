import BlockTypes from '@/utils/page/Blocks'
import ImageInput from '@/inputs/ImageInput'
import Button from '@/UI/Button'
import ImageList from '@/inputs/ImageList'
import { Title } from '@/components/Page/Settings/Tabs'
import { useState } from 'react'

import LightGallery from 'lightgallery/react'

export const RegularGallerySettings = ({ blockKey, variables, close }) => {
	const type = BlockTypes.filter((b) => b.id === 'gallery')[0]
	const [images, setImages] = useState(variables.pictures)

	return (
		<>
			<ImageList
				images={images}
				blockId={blockKey}
			/>

			<Title
				title='הוספת תמונה'
				des='ניתן לבחור כמה תמונות ביחד'
			/>

			<ImageInput
				name='custom/gallery'
				formats={['png', 'jpeg']}
				blockId={blockKey}
				setImages={setImages}
				multiple
			/>

			<Button
				style='cyan'
				className='w-full'
				onClick={close}
			>
				סגירה
			</Button>
		</>
	)
}

const RegularGallery = ({ variables }) => {
	const type = BlockTypes.filter((b) => b.id === 'gallery')[0]

	return (
		<div className='p-6 pb-10 px-12'>
			<h5 className='block_title block text-4xl font-semibold text-gray-800'> גלרייה </h5>
			<LightGallery
				speed={500}
				mode='lg-fade'
			>
				{variables.pictures?.map((pic) => (
					<a href={`/uploads/${pic.file}`}>
						<img
							alt={pic.title}
							src={`/uploads/${pic.file}`}
							className='rounded-md duration-300 hover:shadow-lg hover:-translate-y-2'
						/>
					</a>
				))}
			</LightGallery>
		</div>
	)
}

export default RegularGallery
