import Avatar from '@mui/material/Avatar'
import VerifiedIcon from '@mui/icons-material/Verified'
import Tooltip from '@mui/material/Tooltip'

const SocialLink = ({ title, text }) => (
	<div className='w-52'>
		<span className='block font-medium'>אינסטגרם</span>
		<span className='block'>@amir.eliz</span>
	</div>
)

const Header = ({ name, avatar, title }) => {
	return (
		<div className='container mx-auto z-20 -mt-20 bg-white h-44 rounded-3xl shadow-low flex p-6 px-12'>
			<div className='-mt-16'>
				{
					<Avatar
						alt={name}
						src={`/uploads/${avatar}`}
						className='!w-[11rem] !h-[11rem] !rounded-[2.5rem] !border-4 border-white shadow-lg !text-7xl'
					>
						{name.slice(null, -name.length + 2)}
					</Avatar>
				}
			</div>
			<div className='p-4 px-8 w-1/3'>
				<span className='font-semibold text-gray-700 text-2xl flex items-center'>
					<Tooltip
						title='משתמש מאומת'
						placement='top'
						arrow
					>
						<VerifiedIcon className='ml-2' />
					</Tooltip>
					{name}
				</span>
				<span className='block text-gray-500 '>{title}</span>
			</div>
			<div className='p-2 pr-20 border-r-[1px] grid grid-cols-2 gap-2 text-gray-600 text-sm items-center'>
				<SocialLink />
				<SocialLink />
				<SocialLink />
				<SocialLink />
			</div>
		</div>
	)
}

export default Header
