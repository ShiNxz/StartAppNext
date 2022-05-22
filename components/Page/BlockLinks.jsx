import { Link as ScrollLink } from 'react-scroll'
import BlockTypes from '@/utils/page/Blocks'

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
				<></>
			)}
		</div>
	</div>
)

export default Links
