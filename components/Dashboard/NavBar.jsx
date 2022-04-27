import Image from 'next/image'
import Logo from '@/public/assets/logo.png'
import UserMenu from '../User/UserMenu'

const NavBar = () => {

  return (
    <div className='w-full bg-white top-0 h-16 absolute flex shadow-md shadow-slate-700/5 content-between p-4 flex-row-reverse'>
      <Image src={Logo} className="duration-300" height={22} width={110} onClick={() => router.push(`/`)} />
      <UserMenu/>
    </div>
  )
}

export default NavBar