import { useState } from 'react'
import Divider from '@mui/material/Divider'
import Items from './Pages'
import { useRouter } from 'next/router'

const Item = ({ active, onClick, name, icon }) => {
	return (
		<div
			className={`p-4 py-0 px-10 my-6 duration-300 border-l-4 ${
				active ? 'border-cyan-500' : ''
			} hover:border-cyan-500`}
		>
			<div className=''>
				<a
					onClick={onClick}
					className={`flex justify-center flex-col items-center ${
						active ? 'text-neutral-800' : 'text-neutral-500'
					} hover:text-neutral-900`}
				>
					{icon}
					<span className='mt-2 w-max'>{name}</span>
				</a>
			</div>
		</div>
	)
}

const SideBar = () => {
	const Router = useRouter()
	const [link, setLink] = useState(0)
	const handleLink = (index) => {
		Router.push(Items[index].link)
		setLink(index)
	}

	return (
		<div className='h-full py-8 pl-4'>
			<div className='bg-white h-full rounded-md shadow-xl shadow-slate-700/15 py-2'>
				{Items.map((i, index) => (
					<div key={i.name}>
						<Item
							onClick={() => handleLink(index)}
							active={Items[index].link === Router.route}
							name={i.name}
							link={i.link}
							icon={i.icon}
						/>
						<Divider className='!mx-4' />
					</div>
				))}
			</div>
		</div>
	)
}

export default SideBar
