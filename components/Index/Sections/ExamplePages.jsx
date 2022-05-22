import bg_features_secondary from '@/public/assets/bg_features_secondary.png'
import test from '@/public/assets/test.jpg'
import Button from '@/Next/Button'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const Page = () => {
	return (
		<div className='overflow-hidden shadow-lg rounded-xl h-90 w-60 md:w-80 cursor-pointer m-auto text-right'>
			<img
				alt='blog photo'
				src={test.src}
				className='max-h-80 w-full object-cover'
			/>

			<div className='bg-white dark:bg-gray-800 w-full p-4'>

				<div className='flex items-center mb-3'>
					<img
						alt='Amir Eliz'
						src='http://localhost:3000/uploads/upload_1d32bcbded2fb527bf56403bf70e15f1.jpg'
						className='object-cover rounded-full h-10 w-10 '
					/>
					<div className='mr-2 text-sm h-10'>
						<span className='text-gray-800 font-bold dark:text-white block'>אמיר אליז</span>
						<span className='text-gray-500 dark:text-gray-300 block'>מתכנת אתרים</span>
					</div>
				</div>

				{ /* get the first block + variables */ }
				<span className='text-gray-800 dark:text-white text-lg font-medium'>אודות</span>
				<p className='text-gray-600 dark:text-gray-300 font-light text-sm my-1'>
					The new supercar is here, 543 cv and 140 000$. This is best racing GT about 7 years on The new supercar is here, 543 cv and 140 000$. This is best racing GT about 7 years on...
				</p>
				<Button size='sm' className='mt-8'>
					מעבר לעמוד <KeyboardBackspaceIcon className='mr-3' />
				</Button>
			</div>
		</div>
	)
}

const PageExamples = () => {
	return (
		<div className='relative text-center py-8'>
			<span className='font-medium text-2xl'>דפים לדוגמא</span>
			
			<div className='container z-20 grid grid-cols-3 relative py-4'>
				<Page />
				<Page />
				<Page />
			</div>
			<div
				style={{ backgroundImage: `url(${bg_features_secondary.src})` }}
				className='bg-cover bg-center h-full w-full opacity-[.10] absolute inset-0 z-0'
			/>

		</div>
	)
}

export default PageExamples
