import Button from '@/components/UI/Button'
import BlockTypes from '@/utils/page/Blocks'
import SettingsInput from '../Inputs/Input'

export const CustomTextBoxSettings = ({ blockKey, variables, close }) => {
	const type = BlockTypes.filter((b) => b.id === 'customTextBox')[0]

	return (
		<>
			{type.variables.map((variable, index) => (
				<SettingsInput
					name={`blocks.${blockKey}.${variable.identifier}`}
					title={type.name}
					initValue={variables[type.variables[index].identifier]}
					helper={variable.description}
					placeholder={variable.placeholder}
					validate={variable.validation}
					className='!mb-4 !w-full !mx-0'
					multiline={true}
					key={`${blockKey}.${variable.identifier}`}
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

const CustomTextBox = ({ variables }) => {
	const type = BlockTypes.filter((b) => b.id === 'customTextBox')[0]

	return (
		<div className='p-6 pb-10 px-12'>
			<h5 className='block_title block text-4xl font-semibold text-gray-800'> {variables[type.variables[0].identifier]} </h5>
			<p className='text-gray-600'> {variables[type.variables[1].identifier]} </p>
		</div>
	)
}

export default CustomTextBox
