import bg_features_secondary from '@/public/assets/bg_features_secondary.png'
import test from '@/public/assets/test.jpg'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const features = [
	{
		title: 'שימוש בבלוקים',
		text: 'שימוש בבלוקים על מנת להוסיף תוכן לדף שלכם, ניתן להוסיף מתוך מגוון רחב של בלוקים מוכנים ומותאמים אישית, לערוך ואף להגדיר את הבלוק על פי העיצוב של הדף שלכם!',
		readMore: '#',
	},
]

const FeaturesSecondaryItem = ({ title, text, readMore }) => {
	return (
		<div className='py-12 relative'>
			<div className='bg-white p-12 m-auto rounded-xl pl-[25rem]'>
				<h4 className='text-bold text-xl'>{title}</h4>
				<p>{text}</p>
				{readMore && (
					<a
						className='mt-12 font-medium block'
						href={readMore}
						aria-label='readMore'
					>
						קרא עוד <KeyboardBackspaceIcon className='mr-0.5' />
					</a>
				)}
			</div>
			<img
				src={test.src}
				alt='test'
				className='w-80 h-[90%] absolute left-0 top-4 bottom-4 rounded-lg object-cover'
			/>
		</div>
	)
}

const FeaturesSecond = () => {
	return (
		<div className='relative'>
			<div className='container z-20 my-12 px-12 relative'>
				{features.map((f) => (
					<FeaturesSecondaryItem
						title={f.title}
						text={f.text}
						readMore={f.readMore}
						key={f.title}
					/>
				))}
			</div>
			<div
				style={{ backgroundImage: `url(${bg_features_secondary.src})` }}
				className='bg-cover bg-center h-full w-full opacity-[.10] absolute inset-0 z-0'
			/>
		</div>
	)
}

export default FeaturesSecond
