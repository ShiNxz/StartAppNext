import Head from 'next/head'
import { useContext } from 'react'

import AppContext from "@/data/AppContext"

import NavBar from '@/components/Dashboard/NavBar'
import Footer from '@/components/Dashboard/Footer'
import SideBar from '@/components/Dashboard/SideBar'
import ColoredBox from '@/components/Dashboard/ColoredBox'
import SettingsBar from '@/components/Dashboard/SettingsBar'

const Dashboard = () => {
	const { setLoading } = useContext(AppContext)
    setLoading(false)

    return (
        <>
            <Head> <title>StartApp | הגדרות משתמש</title> </Head>

            <NavBar/>
            <div className="flex h-[100vh] flex-row-reverse pt-16 pb-8 justify-between">
              <SideBar/>
              <div className='p-8 w-full'>
                <div className='flex flex-col'>
                  <div className='grid gap-5 grid-cols-4 justify-items-center'>
                    <ColoredBox/>
                    <ColoredBox/>
                    <ColoredBox/>
                    <ColoredBox/>
                  </div>
                </div>
              </div>
              <SettingsBar />
            </div>
            <Footer/>
        </>
    )
}

export default Dashboard