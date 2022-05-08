import ImageGallery from 'react-image-gallery'
import BlockTypes from '@/utils/page/Blocks'
import ImageInput from './../Inputs/ImageInput'
import Button from '@/components/UI/Button'
import ImageList from '../Inputs/ImageList'
import { Title } from '@/components/Page/Settings/Tabs'
import { useState } from 'react'

const CarouselBlock = ({ variables }) => {
	return (
		<>
			<ImageGallery
				items={variables.pictures.map((pic) => ({ original: `/uploads/${pic.file}` }))}
				showThumbnails={false}
				showFullscreenButton={false}
				isRTL={true}
				autoPlay={true}
				showIndex={true}
				slideInterval={6000}
			/>
		</>
	)
}

export const CarouselBlockSettings = ({ blockKey, variables, close }) => {
	const type = BlockTypes.filter((b) => b.id === 'carousel')[0]
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

export default CarouselBlock
