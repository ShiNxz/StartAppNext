import { useState } from 'react'

import { TabPanel } from '@/components/Page/SideBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import SettingsTabs from '@/components/Page/SettingsTabs'

const SettingsBar = () => {
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => setValue(newValue)

    return (
        <div className='bg-slate-100 h-full w-[30rem]'>
            <Box className='border-b bg-white'>
                <div className='p-5 px-6 bg-blue-400'>
                    <h7 className='text-3xl text-white font-light mb-0'>הגדרות דף</h7>
                </div>
                <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="settings tabs" centered>
                {
			        SettingsTabs.map((tab, index) => <Tab key={tab.name} label={tab.name} id={`panel-${index}`} aria-controls={`tab-panel-${index}`} />)
			    }
                </Tabs>
            </Box>
			{
				SettingsTabs.map((tab, index) =>
					<TabPanel value={value} key={tab.name} index={index}>{ tab.component }</TabPanel>
				)
			}
        </div>
    )
}

export default SettingsBar