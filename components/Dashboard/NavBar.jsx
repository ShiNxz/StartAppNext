import Image from 'next/image'
import Logo from '@/public/assets/logo.png'
import UserMenu from '../User/UserMenu'
import UserAlerts from '../User/UserAlerts'
import Router from 'next/router'
import DarkModeIcon from '@mui/icons-material/DarkMode'

const NavBar = () => {
	return (
		<div className='w-full bg-white top-0 h-16 absolute flex shadow-md shadow-slate-700/5 content-between p-4 flex-row-reverse justify-between'>
			<Image
				src={Logo}
				className='duration-300 cursor-pointer'
				height={22}
				width={37}
				onClick={() => Router.push(`/`)}
			/>
			<div className='flex items-center'>
				<UserMenu />
				<UserAlerts />
				<DarkModeIcon className='' />

			</div>
		</div>
	)
}

export default NavBar