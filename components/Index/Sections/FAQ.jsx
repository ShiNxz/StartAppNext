import bg_features_secondary from '@/public/assets/bg_features_secondary.png'
import { Collapse, Text, Grid } from '@nextui-org/react'

const Item = () => {
	return (
		<Collapse
			title='לורם איפסום דולור סיט אמט'
			//expanded
			shadow={false}
		>
			<Text>
				לורם איפסום דולור סיט אמטלורם איפסום דולור סיט אמטלורם איפסום דולור סיט אמטלורם איפסום דולור סיט אמטלורם
				איפסום דולור סיט אמטלורם איפסום דולור סיט אמט
			</Text>
		</Collapse>
	)
}

const FAQ = () => {
	return (
		<div className='relative text-center py-8'>
			<span className='font-medium text-2xl'>שאלות נפוצות</span>

			<div className='container z-20 py-6 relative text-right'>
				<Collapse.Group splitted>
					<Item/>
					<Item/>
					<Item/>
					<Item/>
				</Collapse.Group>
			</div>
		</div>
	)
}

export default FAQ
