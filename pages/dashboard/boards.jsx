import Head from 'next/head'
import { useContext, useState, useEffect } from 'react'

import AppContext from '@/data/AppContext'

import NavBar from '@/components/Dashboard/NavBar'
import Footer from '@/components/Dashboard/Footer'
import SideBar from '@/components/Dashboard/SideBar'
import useUser from '@/data/useUser'

import Board from '@/components/Dashboard/boards/Board'
import AddBoard from '@/components/Dashboard/boards/AddBoard'

const Dashboard = () => {
	const { user, mutate } = useUser()
	console.log(user)
	const { setLoading } = useContext(AppContext)
	setLoading(false)
	const [list, setList] = useState([])

	useEffect(() => {
		user?.boards && setList(user.boards)
	}, [user])

	return (
		user?.boards ? <>
			<Head>
				<title>StartApp | פתקים</title>
			</Head>

			<NavBar />
			<div className='flex h-[100vh] flex-row-reverse pt-16 pb-8 justify-between'>
				<SideBar />
				<div className='p-8 w-full'>
					<div className='flex flex-row-reverse px-4'>
						{user.boards.map((b, i) => (
							<Board
								key={b.name}
								name={b.name}
								board={i}
								list={list}
								setList={setList}
								index={i}
								mutate={mutate}
							/>
						))}
						<AddBoard />
					</div>
				</div>
			</div>
			<Footer />
		</> : 'Loading'
	)
}

export default Dashboard
