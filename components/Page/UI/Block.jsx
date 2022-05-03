import BlockTypes from '@/utils/page/Blocks'
import { Element } from 'react-scroll'

const Block = ({ info }) => {
	const BlockComponent = BlockTypes.filter((b) => b.id === info.type)[0].component

	return (
		<Element
			name={info.key}
			id={info.type}
			key={info.type}
			className='mx-auto z-20 bg-white rounded-3xl shadow-low overflow-hidden mb-8 w-full'
		>
			<BlockComponent variables={info.variables} />
		</Element>
	)
}

export default Block
