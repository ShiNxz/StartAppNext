import { useContext, useEffect, useState, createContext, useMemo } from 'react'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import AppContext from '@/data/AppContext'
import Banner from '@/components/Page/UI/Banner'
import Header from '@/components/Page/UI/Header'
import SideBar from '@/components/Page/UI/SettingsSideBar'
import Block from '@/components/Page/UI/Block'
import SpeedDial from '@/components/Page/UI/SpeedDial'
import useUser from '@/data/useUser'
import Error from '@/components/UI/Error'
import CreateProfile from '@/components/Page/CreatePage'
import Layout from '@/components/UI/Layout'
import Links from '@/components/Page/BlockLinks'

export const ProfileContext = createContext({ data: null, mutate: null })

const Profile = ({ params }) => {
	const { loggedIn, user } = useUser()
	const { data: pageData, mutate } = useSWR(`/api/profile/${params}`, fetcher)
	const [menu, setMenu] = useState(false)

	const { setLoading } = useContext(AppContext)

	useEffect(() => {
		setLoading(true)
	}, [])

	const data = useMemo(() => pageData, [pageData])

	useEffect(() => {
		if (!data) return
		setLoading(false)
		document.title = `StartApp | ${data.name}`
	}, [data])

	return (
		<Layout def>
			{!data ? (
				<></>
			) : !data?.name ? (
				data.userId ? (
					loggedIn && data.userId === user.userId ? (
						<ProfileContext.Provider value={{ mutate }}>
							<CreateProfile user={user} />
						</ProfileContext.Provider>
					) : (
						<Error text='הדף לא נבנה...' />
					)
				) : (
					<Error text='המשתמש לא קיים באתר...' />
				)
			) : (
				<ProfileContext.Provider value={{ data, mutate }}>
					{loggedIn && user.userId === data.userId && (
						<>
							<SpeedDial menu={{ menu, setMenu }} />
							<SideBar
								menu={menu}
								setMenu={setMenu}
							/>
						</>
					)}
					<Banner banner={data.banner} />
					<Header
						name={data.name}
						title={data.title}
						avatar={data.avatar}
					/>
					<div className='container mx-auto flex flex-row content-between'>
						<Links blocks={data.blocks} />
						<div className='mr-8 mt-8 w-full'>
							{data.blocks?.length > 0 &&
								data.blocks.map((b) => (
									<Block
										key={b.key}
										info={b}
									/>
								))}
						</div>
					</div>
				</ProfileContext.Provider>
			)}
		</Layout>
	)
}

export function getServerSideProps(context) {
	return {
		props: {
			params: context.params.user,
		},
	}
}

export default Profile
