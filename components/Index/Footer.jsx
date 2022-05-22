import Router from 'next/router'

const Links = [
	{
		name: 'עמוד ראשי',
		link: '#',
	},
	{
		name: 'עלינו',
		link: '#',
	},
	{
		name: 'צור קשר',
		link: '#',
	},
	{
		name: 'מחירים',
		link: '#',
	},
	{
		name: 'יתרונות',
		link: '#',
	},
	{
		name: 'שאלות נפוצות',
		link: '#',
	},
]

const Footer = () => {
	return (
		<div className='bg-gray-200 w-full py-12'>
			<div className='container px-8 flex flex-row justify-between'>
				<div className='flex flex-row'>
					<div className='ml-12'>
						<span className='font-bold block mb-4'>קישורים שימושיים</span>
						{Links.map((l) => (
							<a
								className='font-medium text-gray-500 block'
								href={l.link}
								key={l.name}
							>
								{l.name}
							</a>
						))}
					</div>
					<div>
						<span className='font-bold block mb-4'>בלוג</span>
						
						<div className='flex flex-row mb-3'>
							<img src='https://ichef.bbci.co.uk/news/1024/branded_news/13F00/production/_95146618_bills.jpg' alt='TEMP!' className='w-12 h-12 rounded-lg object-cover ml-2'/>
							<div>
								<span className='font-bold block'>כותרת 2 - דוגמה</span>
								<span className='text-gray-400 text-xs'>13/05/22</span>
							</div>
						</div>
						
						<div className='flex flex-row mb-3'>
							<img src='https://ichef.bbci.co.uk/news/1024/branded_news/13F00/production/_95146618_bills.jpg' alt='TEMP!' className='w-12 h-12 rounded-lg object-cover ml-2'/>
							<div>
								<span className='font-bold block'>כותרת 2 - דוגמה</span>
								<span className='text-gray-400 text-xs'>13/05/22</span>
							</div>
						</div>

						<div className='flex flex-row mb-3'>
							<img src='https://ichef.bbci.co.uk/news/1024/branded_news/13F00/production/_95146618_bills.jpg' alt='TEMP!' className='w-12 h-12 rounded-lg object-cover ml-2'/>
							<div>
								<span className='font-bold block'>כותרת 2 - דוגמה</span>
								<span className='text-gray-400 text-xs'>13/05/22</span>
							</div>
						</div>
						
					</div>
				</div>

				<div className='text-left'>
					<a
						onClick={() => Router.push('/')}
						className='font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-transparent'
					>
						STARTAPP
					</a>
					<span className='text-xs block mb-4'>2022 - 2021</span>
					<span className='text-xs block'>contact@startapp.org.il</span>
				</div>
			</div>
		</div>
	)
}

export default Footer
