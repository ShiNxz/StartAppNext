import Button from '@/components/UI/Button'
import BlockTypes from '@/utils/page/Blocks'
import SettingsInput from '../Settings/Input'

export const AboutMeSettings = ({ variables, close }) => {
	const type = BlockTypes.filter((b) => b.id === 'aboutMe')[0]

	return (
		<>
			{type.variables.map((variable, index) => (
				<SettingsInput
					name={variable.name}
					title={type.name}
					initValue={variables[type.variables[index].identifier]}
					helper={variable.description}
					placeholder={variable.placeholder}
					validate={variable.validation}
					className='!mb-4 !w-full !mx-0'
					InputProps={{ minLength: 1, maxLength: 10 }}
					multiline={true}
					key={variable.name}
					rows={variable.rows}
				/>
			))}

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

const AboutMe = ({ variables }) => {
	const type = BlockTypes.filter((b) => b.id === 'aboutMe')[0]

	return (
		<div className="p-6 pb-10 px-12">
			<h5 className='block_title block text-4xl font-semibold text-gray-800'> אודות </h5>
			<p className='text-gray-600'> {variables[type.variables[0].identifier]} </p>
		</div>
	)
}

export default AboutMe
