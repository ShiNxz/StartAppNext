import SettingsInputs from '@/utils/page/SettingsInputs'
import ImageInput from '../Inputs/ImageInput'
import { Title } from './Tabs'

const ImagesSettings = () => {
	return (
		<>
			{SettingsInputs.images.map((i) => (
				<>
					<Title
						title={i.title.name}
						des={i.title.description}
					/>
					<ImageInput name={i.inputName} />
				</>
			))}
		</>
	)
}

export default ImagesSettings
