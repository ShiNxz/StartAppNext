import { useContext, useEffect, useState, createContext } from 'react'
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
import Footer from '@/components/UI/Footer'
import Navbar from '@/components/UI/Navbar'
import BlockTypes from '@/utils/page/Blocks'
import { Link as ScrollLink } from 'react-scroll'

export function getServerSideProps(context) {
	return {
		props: {
			params: context.params.user,
		},
	}
}

const Link = ({ title, icon, bKey }) => (
	<ScrollLink
		activeClass='active'
		to={bKey}
		spy={true}
		smooth={true}
		offset={-70}
		className='rounded-3xl p-4 mb-4 bg-slate-100 flex flex-col justify-center items-center text-gray-600 hover:bg-slate-200 hover:text-gray-800'
	>
		{icon}
		<span className='font-medium text-md text-center'>{title}</span>
	</ScrollLink>
)

const Links = ({ blocks }) => (
	<div className='w-[17%] sticky top-0 h-fit -mt-8'>
		<div className='rounded-3xl shadow-low bg-white p-7 mt-16'>
			{blocks?.length > 0 ? (
				blocks.map((b) => {
					const Type = BlockTypes.filter((type) => type.id === b.type)[0]
					return (
						<Link
							bKey={b.key}
							title={Type.name}
							key={b.key}
							icon={Type.icon}
						/>
					)
				})
			) : (
				<>none</>
			)}
		</div>
	</div>
)

export const ProfileContext = createContext({ data: null, mutate: null })

const Profile = ({ params }) => {
	const { loggedIn, user } = useUser()
	const { data, mutate } = useSWR(`/api/profile/${params}`, fetcher)
	const [menu, setMenu] = useState(true)

	const { setLoading } = useContext(AppContext)

	useEffect(() => {
		data && setLoading(false)
		if (data?.name) document.title = `StartApp | ${data.name}`
	}, [data])

	return (
		<div className='flex flex-col content-between'>
			<Navbar />
			<main>
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
			</main>
			<Footer />
		</div>
	)
}

export default Profile
