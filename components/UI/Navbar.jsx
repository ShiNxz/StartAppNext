import { useState, useContext } from 'react'
import RegisterModal from '@/components/Auth/RegisterModal'
import LoginModal from '@/components/Auth/LoginModal'
import userContext from '@/data/UserContext'
import Router from 'next/router'
import UserMenu from '../User/UserMenu'
import HomeIcon from '@mui/icons-material/Home'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import Button from '@/Next/Button'

const Navbar = () => {
	const [loginModal, setLoginModal] = useState(false)
	const [registerModal, setRegisterModal] = useState(false)

	const [minimize, setMinimize] = useState(true)

	const { loggedIn } = useContext(userContext)

	return (
		<nav className='bg-white duration-300 dark:bg-primary-dark shadow-lg z-40 fixed w-full h-14 top-0'>
			<div className='container mx-auto h-full'>
				<div className='flex items-center justify-between py-2 content-center h-full float-left rtl:float-right md:!float-none'>
					<div className='flex items-center'>
						<div className='hidden md:flex ml-10 items-baseline space-x-4'>
							<a
								className='text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium'
								href='#Main'
							>
								<HomeIcon
									onClick={() => Router.push(`/`)}
									className='mr-2'
								/>
							</a>
						</div>
					</div>

					<div className='hidden md:block'>
						<div className='ml-4 flex items-center md:ml-6'>
							<DarkModeIcon className='text-gray-700 hover:text-slate-200 duration-200 cursor-pointer h-8 w-8 mx-2' />

							{loggedIn ? (
								<UserMenu />
							) : (<>
								<Button onClick={() => setLoginModal(true)} className='!w-20 !min-w-fit'size='sm' light>התחבר</Button>
								<Button onClick={() => setRegisterModal(true)} size='sm'>צור דף אישי משלך</Button>
								</>
							)}
						</div>
					</div>

					<div className='-mr-2 flex md:hidden'>
						<div className='inline-flex items-center justify-center'>
							<button
								aria-label='darkmode'
								onClick={() => setMinimize(!minimize)}
								className='text-gray-700 hover:text-gray-300 p-2 rounded-md focus:outline-none'
							>
								<svg
									width='20'
									height='20'
									fill='currentColor'
									className='h-8 w-8'
									viewBox='0 0 1792 1792'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z'></path>
								</svg>
							</button>

							<DarkModeIcon className='text-gray-700 hover:text-slate-200 duration-200 cursor-pointer h-8 w-8 mx-2' />

							{loggedIn ? (
								<UserMenu />
							) : (
								<div className='text-sm font-medium'>
									<a
										className='p-2'
										onClick={() => setLoginModal(true)}
									>
										התחבר
									</a>
									<a
										className='p-2'
										onClick={() => setRegisterModal(true)}
									>
										צור דף אישי משלך!
									</a>
									<>
										<LoginModal
											open={loginModal}
											setOpen={setLoginModal}
											setOpenRegister={setRegisterModal}
										/>
										<RegisterModal
											open={registerModal}
											setOpen={setRegisterModal}
											setOpenLogin={setLoginModal}
										/>
									</>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<div
				className={`md:hidden duration-300 px-2 pt-2 pb-3 space-y-1 sm:px-3 overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-indigo-900/80 ${
					minimize ? '!h-0 !py-0' : 'h-64'
				}`}
			>
				<a
					className='text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium'
					href='#Main'
				>
					<HomeIcon className='mr-2' />
				</a>
			</div>
		</nav>
	)
}
export default Navbar