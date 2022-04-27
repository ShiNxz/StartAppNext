import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import { useState } from 'react'
import SettingsTabs from './SettingsTabs'
import Button from '../UI/Button'

const SideBar = ({ menu, setMenu }) => {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => setValue(newValue)

	const TabPanel = ({ children, index }) => {      
		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
			>
				{value === index && (
					<Box className='p-12 py-4'>
						{children}
					</Box>
				)}
			</div>
		)
	}

    return (
        <SwipeableDrawer
            anchor='left'
            open={menu}
            onClose={() => setMenu(false)}
            onOpen={() => setMenu(true)}
        >
            <div className='bg-slate-200 h-full w-[39rem]'>
            	<Box className='border-b'>
            	    <Tabs className='bg-white' value={value} onChange={handleChange} aria-label="settings tabs" centered>
            	        {
							SettingsTabs.map((tab, index) => <Tab key={tab.name} label={tab.name} id={`panel-${index}`} aria-controls={`tab-panel-${index}`} />)
						}
            	    </Tabs>
            	</Box>
				{
					SettingsTabs.map((tab, index) =>
						<TabPanel key={tab.name} index={index}>{ tab.component }<Button onClick={() => setMenu(false)} style='blue' className='w-[90%] absolute bottom-4 left-0 right-0 m-auto'>סגירה</Button></TabPanel>
					)
				}
            </div>
        </SwipeableDrawer>
    )
}

export default SideBar