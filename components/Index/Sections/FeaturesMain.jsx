import Tilt from 'react-parallax-tilt'
import bg_features_secondary from '@/public/assets/bg_features_secondary.png'

const items = [
	{
		title: 'ללא עלות',
		text: 'פתיחת דף בחינם לגמרי, ללא מגבלות זמן או שימוש!'
	},
	{
		title: 'שימוש בבלוקים',
		text: 'אפשרות לעצב ולשנות כל חלק בדף והוספת בלוקים לבחירתכם!'
	},
	{
		title: 'מערכת נוחה ופשוטה',
		text: 'מערכת עיצוב הדף שלכם פשוטה וקלה לשימוש ועריכה!'
	},

	{
		title: 'עיצובים מוכנים',
		text: 'בחירה מתוך מבחר עיצובים מוכנים לעמוד שלכם!'
	},
	{
		title: 'פאנל ניהול',
		text: 'פאנל ניהול הכולל הגדרות הדף, צפייה בנתוני כניסות, ועוד!'
	}
]

const Item = ({ title, text }) => {
	return (
		<Tilt 
			tiltMaxAngleX={15}
    		tiltMaxAngleY={15}
    		perspective={1000}
    		transitionSpeed={1500}
    		scale={1.05}
    		gyroscope={true}
		>
		<div className='bg-white shadow-lg flex flex-col p-12 text-center rounded-2xl w-50'>
			<span className='text-lg font-medium'>{ title }</span>
			<span>{ text }</span>
		</div>
		</Tilt>
	)
}

const Features = () => {
	return (
		<div className='relative bg-slate-100'>
			<div className='container z-20 py-12 relative'>
				<div className='grid grid-cols-3 gap-16 '>
					{
						items.map(i => <Item title={i.title} text={i.text} key={i.title} />)
					}
				</div>
			</div>
			<div
				style={{ backgroundImage: `url(${bg_features_secondary.src})` }}
				className='bg-cover bg-center h-full w-full opacity-[.10] absolute inset-0 z-0'
			/>
		</div>
	)
}

export default Features