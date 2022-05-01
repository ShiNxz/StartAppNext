import BlockTypes from '@/utils/page/Blocks'
import { Element } from 'react-scroll'

const Block = ({ info, index }) => {
	const Component = BlockTypes.filter((b) => b.id === info.type)[0].component

	return (
		<Element
			name={`${info.type}-${index}`}
			id={info.type}
			key={info.type}
			className='mx-auto z-20 bg-white rounded-3xl shadow-low overflow-hidden mb-8 w-full'
		>
			<Component variables={info.variables} />
		</Element>
	)
}

export default Block
