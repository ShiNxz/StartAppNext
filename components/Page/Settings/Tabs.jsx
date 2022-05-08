// Imports
import MainInformation from './MainInformation'
import ImagesSettings from './Images'
import BlocksSettings from './Blocks'

export const Title = ({ title, des = null }) => (
	<>
		<h5 className='settings_title mb-1'> {title} </h5>
		{des && <p className='text-center mb-6 text-sm text-gray-600'> {des} </p>}
	</>
)

const Tabs = [
	{
		name: 'הגדרות כלליות',
		component: <MainInformation />,
	},
	{
		name: 'תמונה ובאנר',
		component: <ImagesSettings />,
	},
	{
		name: 'בלוקים',
		component: <BlocksSettings />,
	},
	{
		name: 'תמונה ובאנר 2',
		component: <ImagesSettings />,
		package: 2,
	},
]

export default Tabs
