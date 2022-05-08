import { useEffect, useState } from 'react'
import useUser from '@/data/useUser'

import AddNewBlock from './Blocks/AddBlock'
import SortBlocks from './Blocks/SortBlocks'

const BlocksSettings = () => {
	const { user, mutate } = useUser()

	const [state, setState] = useState([])
	const [memory, setMemory] = useState([])

	useEffect(() => {
		setState(user.page.blocks.map(({ key, type, variables }) => ({ key, type, variables })))
	}, [user.page.blocks])

	return (
		<>
			<SortBlocks
				state={state}
				setState={setState}
				memory={memory}
				setMemory={setMemory}
				mutate={mutate}
			/>
			<AddNewBlock
				mutate={mutate}
				setMemory={setMemory}
				setState={setState}
			/>
		</>
	)
}

export default BlocksSettings
