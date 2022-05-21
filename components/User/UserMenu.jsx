import { useState, useContext } from 'react'
import userContext from '@/data/UserContext'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useSnackbar } from 'notistack'
import Router from 'next/router'

const UserMenu = () => {
    const { enqueueSnackbar } = useSnackbar()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = event => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const { user, logout } = useContext(userContext)
	
    return user ? (
        <div className='flex'>
            <Tooltip title="הגדרות">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar alt={user?.username} src={`/uploads/${user?.avatar}`} sx={{ width: 32, height: 32 }}>{ user.page?.name?.slice(null, -user.page?.name.length+2) || user.username?.slice(null, -user.username.length+2) }</Avatar>
                </IconButton>
            </Tooltip>

            <div className='flex flex-col justify-center'>
                <span className="font-semibold text-sm leading-3">ברוך הבא, {user.page?.name || user.username}</span>                
                <a onClick={handleClick} className="duration-200 underline decoration-white/100 hover:decoration-gray-500 decoration-2 userDropdown text-sm leading-4">הגדרות</a>                
            </div>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 1px 4px rgba(0,0,0,0.15))',
                        mt: 1.5,
                        borderRadius: 2,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            left: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                <MenuItem onClick={() => Router.push(`/${user.username}`)}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    { user.page ? 'צפייה בדף שלך' : 'צור דף אישי' }
                </MenuItem>
                <MenuItem onClick={() => Router.push(`/dashboard`)}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    פאנל ניהול
                </MenuItem>
                <MenuItem onClick={() => Router.push(`/dashboard/settings`)}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    הגדרות משתמש
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    הגדרות
                </MenuItem>
                <MenuItem onClick={
                    () => {
                        logout()
                        enqueueSnackbar('התנתקת בהצלחה!', { variant: 'success' })
                    }
                }>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    התנתק
                </MenuItem>
            </Menu>
        </div>
    ) : <></>
}

export default UserMenu