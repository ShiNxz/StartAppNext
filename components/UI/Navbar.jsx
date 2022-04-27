import { useState, useContext } from 'react'
import Image from 'next/image'
import Logo from '@/public/assets/logo.png'
import RegisterModal from '@/components/Auth/RegisterModal'
import LoginModal from '@/components/Auth/LoginModal'
import userContext from '@/data/UserContext'
import { useRouter } from 'next/router'
import UserMenu from '../User/UserMenu'

const Navbar = () => {
    const router = useRouter()

    const [loginModal, setLoginModal] = useState(false)
    const [registerModal, setRegisterModal] = useState(false)
    
    const { loggedIn } = useContext(userContext)

    return <>
    <nav className="fixed top-0 right-0 min-h-[50px] left-0 z-50 container justify-between mx-auto flex bg-white rounded-b-lg shadow-md items-center p-1 px-7">
        <div className="lg:order-2 h-[22px] w-[96px]">
            <a className="" href="#">
                <Image src={Logo} className="grayscale hover:grayscale-0 duration-300" height={22} width={96} onClick={() => router.push(`/`)} />
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

        <div className="navbar-menu lg:order-1 lg:block">

            { loggedIn ? <UserMenu/> : ( 
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