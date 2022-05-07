import { useEffect, useState, useContext, useMemo } from 'react'
import { ProfileContext } from '@/pages/[user]'
import useUser from '@/data/useUser'

import AddNewBlock from './Blocks/AddBlock'
import SortBlocks from './Blocks/SortBlocks'

const BlocksSettings = () => {
	const { data, mutate } = useContext(ProfileContext)
	const [state, setState] = useState([])
	const [memory, setMemory] = useState([])

	const memoState = useMemo(
		() => data.blocks.map(({ key, type, variables }) => ({ key, type, variables })),
		[data.blocks]
	)

	useEffect(() => {
		memoState && setState(memoState)
		console.log(memoState)
	}, [memoState])

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
