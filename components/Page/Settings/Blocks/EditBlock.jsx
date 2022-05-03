import BlockTypes from '@/utils/page/Blocks'
import Modal from '@/components/UI/Modal'

const SettingsModal = ({ blockKey, type, variables, close }) => {
	const SettingsComponent = BlockTypes.filter((block) => block.id === type)[0].settingsComponent
	return (
		<SettingsComponent
			blockKey={blockKey}
			variables={variables}
			close={close}
		/>
	)
}

const EditBlock = ({ modal, setModal }) => {
	return (
		<Modal
				title='הגדרות בלוק'
				open={!!modal}
				setOpen={setModal}
				maxWidth='md'
			>
				{modal && (
					<SettingsModal
						blockKey={modal.key}
						type={modal.type}
						variables={modal.variables}
						close={() => setModal(false)}
					/>
				)}
			</Modal>
	)
}

export default EditBlock