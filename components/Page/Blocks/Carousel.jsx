import ImageGallery from 'react-image-gallery'
import BlockTypes from '@/utils/page/Blocks'

const CarouselBlock = () => {
	const images = [
		{
			original: 'https://picsum.photos/id/1018/1000/600/',
			thumbnail: 'https://picsum.photos/id/1018/250/150/',
		},
		{
			original: 'https://picsum.photos/id/1015/1000/600/',
			thumbnail: 'https://picsum.photos/id/1015/250/150/',
		},
		{
			original: 'https://picsum.photos/id/1019/1000/600/',
			thumbnail: 'https://picsum.photos/id/1019/250/150/',
		},
	]

	return (
		<>
			<ImageGallery
				items={images}
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

export default CarouselBlock
