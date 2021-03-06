import { useState } from 'react'

import { TabPanel } from '@/components/Page/UI/SettingsSideBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import SettingsTabs from '@/components/Page/Settings/Tabs'

const SettingsBar = () => {
	const [value, setValue] = useState(0)
	const handleChange = (event, newValue) => setValue(newValue)

	return (
		<div className='bg-slate-100 h-full w-[70rem]'>
			<Box className='border-b bg-white'>
				<div className='p-5 px-6 bg-blue-400'>
					<h6 className='text-3xl text-white font-light mb-0'>הגדרות דף</h6>
				</div>
				<Tabs
					value={value}
					variant='fullWidth'
					onChange={handleChange}
					aria-label='settings tabs'
					centered
				>
					{SettingsTabs.map((tab, index) => (
						<Tab
							key={tab.name}
							label={tab.name}
							id={`panel-${index}`}
							aria-controls={`tab-panel-${index}`}
						/>
					))}
				</Tabs>
			</Box>
			{SettingsTabs.map((tab, index) => (
				<TabPanel
					value={value}
					key={tab.name}
					index={index}
				>
					{tab.component}
				</TabPanel>
			))}
		</div>
	)
}

export default SettingsBar