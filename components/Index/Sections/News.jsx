import bg_features_secondary from '@/public/assets/bg_features_secondary.png'
import test from '@/public/assets/test.jpg'
import Button from '@/Next/Button'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const Tag = ({ text }) => {
	return (
		<span className="px-3 py-0.5 text-xs rounded-full text-white bg-indigo-500 ml-1">
	    	#{text}
		</span>
	)
}

const New = () => {
	return (
		<div className='overflow-hidden shadow-lg rounded-xl h-90 w-60 md:w-80 cursor-pointer m-auto text-right duration-300 hover:shadow-xl hover:-translate-y-0.5'>
			<img
				alt='blog photo'
				src={test.src}
				className='max-h-80 w-full object-cover'
			/>

			<div className='bg-white dark:bg-gray-800 w-full p-4'>

				<Tag text='כללי'/>
				<Tag text='כללי'/>

				<span className='text-gray-800 dark:text-white text-md font-bold block mt-2'>לורם איפסום דולור סיט אמט</span>
				<p className='text-gray-600 dark:text-gray-300 font-light text-sm my-1'>
					לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית לפרומי בלוף קינץ תתיח לרעח. לורם איפסום דולור
					סיט אמט...
				</p>

				<Button
					size='sm'
					className='my-6'
					color='secondary'
				>
					המשך לקרוא... <KeyboardBackspaceIcon className='mr-3' />
				</Button>

				<div className='flex items-center my-2'>
					<img
						alt='Amir Eliz'
						src='http://localhost:3000/uploads/upload_1d32bcbded2fb527bf56403bf70e15f1.jpg'
						className='object-cover rounded-full h-10 w-10 '
					/>
					<div className='mr-2 text-sm h-10'>
						<span className='text-gray-800 font-bold dark:text-white block'>אמיר אליז</span>
						<span className='text-gray-500 dark:text-gray-300 block'>13/05/22</span>
					</div>
				</div>
			</div>
		</div>
	)
}

const News = () => {
	return (
		<div className='relative text-center py-8'>
			<span className='font-medium text-2xl'>עדכונים וחדשות</span>

			<div className='container z-20 grid grid-cols-3 relative py-4'>
				<New />
				<New />
				<New />
			</div>
			<div
				style={{ backgroundImage: `url(${bg_features_secondary.src})` }}
				className='bg-cover bg-center h-full w-full opacity-[.10] absolute inset-0 z-0'
			/>
		</div>
	)
}

export default News
