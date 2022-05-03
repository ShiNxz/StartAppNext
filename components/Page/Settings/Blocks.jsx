import { useEffect, useState, useContext } from 'react'
import { ProfileContext } from '@/pages/[user]'
import useUser from '@/data/useUser'

import AddNewBlock from './Blocks/AddBlock'
import SortBlocks from './Blocks/SortBlocks'

const BlocksSettings = () => {
	const { user } = useUser()
	const { mutate } = useContext(ProfileContext)
	const [state, setState] = useState([])
	const [memory, setMemory] = useState([])

	useEffect(() => {
		user.page && setState(user.page.blocks)
	}, [user.page])

	return (
		<>
			<SortBlocks
				user={user}
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
