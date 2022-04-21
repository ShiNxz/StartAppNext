import { useState, useContext } from 'react'
import Image from 'next/image'
import Logo from '@/public/assets/logo.png'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import RegisterModal from '@/components/Auth/RegisterModal'
import LoginModal from '@/components/Auth/LoginModal'
import userContext from '@/data/UserContext'
import { useSnackbar } from 'notistack'

const Navbar = () => {
    const { enqueueSnackbar } = useSnackbar()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const handleClick = event => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const [loginModal, setLoginModal] = useState(false)
    const [registerModal, setRegisterModal] = useState(false)
    
    const { loggedIn, user, logout } = useContext(userContext)

    return <>
    <nav className="fixed top-0 right-0 min-h-[50px] left-0 z-50 container justify-between mx-auto flex bg-gray-100 rounded-b-lg shadow-md items-center p-1 px-7">
        <div className="lg:order-2 h-[22px] w-[96px]">
            <a className="" href="#">
                <Image src={Logo} className="grayscale hover:grayscale-0 duration-300" height={22} width={96} />
            </a>
        </div>
        <div className="block lg:hidden">
            <button className="navbar-burger flex items-center py-2 px-3 text-indigo-500 rounded border border-indigo-500">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>
                        Menu
                    </title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
            </button>
        </div>
        <div className="navbar-menu hidden lg:order-1 lg:block">

            { loggedIn ? (
            <div className='flex'>
                <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar alt="ShiNxz" sx={{ width: 32, height: 32 }}>S</Avatar>
                    </IconButton>
                </Tooltip>

                <div className='flex flex-col justify-center'>
                    <span className="font-semibold text-sm leading-3">ברוך הבא, {user.username}</span>                
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
                    <MenuItem>
                        <Avatar /> פרופיל
                    </MenuItem>
                    <MenuItem>
                        <Avatar /> הגדרות משתמש
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        הגדרות
                    </MenuItem>
                    <MenuItem onClick={() => { logout(); enqueueSnackbar('התנתקת בהצלחה!', { variant: 'success' }) } }>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        התנתק
                    </MenuItem>
                </Menu>
            </div> ) : ( 
                <div className='text-sm font-medium'>
                    <a className='p-2' onClick={() => setLoginModal(true)}>התחבר</a>
                    <a className='p-2' onClick={() => setRegisterModal(true)}>צור דף אישי משלך!</a>
                    <>
                        <LoginModal open={loginModal} setOpen={setLoginModal} setOpenRegister={setRegisterModal} />
                        <RegisterModal open={registerModal} setOpen={setRegisterModal} setOpenLogin={setLoginModal} />
                    </>
                </div>
            )}

        </div>
    </nav>
    </>
}

export default Navbar