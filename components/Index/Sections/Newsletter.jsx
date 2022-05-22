import bg_features_secondary from '@/public/assets/bg_features_secondary.png'
import Input from '@nextui-org/react/cjs/input'
import Button from '@/Next/Button'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const Newsletter = () => {
	return (
		<div className='relative text-center py-8 bg-slate-100'>
			<span className='font-medium text-2xl block'>קבל עדכונים</span>
			<span className='font-normal text-sm'>הרשם לקבלת עדכונים על מבצעים, פוסטים חדשים, וכו'</span>
			<div className='container z-20 my-8 px-12 relative'>
				<div className='flex flex-row place-content-center'>
					<Input
						size='lg'
						placeholder='כתובת אימייל'
						className='!bg-white/100 !w-96'
					/>
					<Button size='lg' className='mr-2'>
						קבל עדכונים <KeyboardBackspaceIcon className='mr-3' />
					</Button>
				</div>
			</div>
			<div
				style={{ backgroundImage: `url(${bg_features_secondary.src})` }}
				className='bg-cover bg-center h-full w-full opacity-[.10] absolute inset-0 z-0'
			/>
		</div>
	)
}

export default Newsletter
