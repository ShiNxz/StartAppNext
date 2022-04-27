import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'

import ShareIcon from '@mui/icons-material/Share'
import EditIcon from '@mui/icons-material/Edit'

const ProfileSpeedDial = ({ menu }) => {
    const actions = [
        {
            icon: <EditIcon />,
            name: 'עריכת דף',
            action: () => menu.setMenu(true)
        },
        {
            icon: <ShareIcon />,
            name: 'שיתוף דף',
            action: () => menu.setMenu(true)
        },
    ]

    return (
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'fixed', bottom: 16, left: 16 }}
            icon={<SpeedDialIcon />}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.action}
                />
            ))}
        </SpeedDial>
    )
}

export default ProfileSpeedDial