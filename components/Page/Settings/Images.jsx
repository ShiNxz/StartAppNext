import SettingsInputs from '@/utils/page/SettingsInputs'
import ImageInput from '../Inputs/ImageInput'
import { Title } from './Tabs'

const ImagesSettings = () => {
	return (
		<>
			{SettingsInputs.images.map((i) => (
				<div key={i.title}>
					<Title
						title={i.title}
						des={i.description}
					/>
					<ImageInput
						name={i.inputName}
						formats={i.formats}
					/>
				</div>
			))}
		</>
	)
}

export default ImagesSettings
