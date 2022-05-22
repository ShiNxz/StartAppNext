import Tilt from 'react-parallax-tilt'
import bg_features_secondary from '@/public/assets/bg_features_secondary.png'
import ViewSidebarTwoToneIcon from '@mui/icons-material/ViewSidebarTwoTone'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import ViewQuiltTwoToneIcon from '@mui/icons-material/ViewQuiltTwoTone';
import SettingsSuggestTwoToneIcon from '@mui/icons-material/SettingsSuggestTwoTone'
import DashboardCustomizeTwoToneIcon from '@mui/icons-material/DashboardCustomizeTwoTone';
import PublishedWithChangesTwoToneIcon from '@mui/icons-material/PublishedWithChangesTwoTone';

const items = [
	{
		title: 'ללא עלות',
		text: 'פתיחת דף בחינם לגמרי, ללא מגבלות זמן או שימוש!',
		icon: <MoneyOffIcon fontSize='inherit'/>,
	},
	{
		title: 'שימוש בבלוקים',
		text: 'אפשרות לעצב ולשנות כל חלק בדף והוספת בלוקים לבחירתכם!',
		icon: <ViewQuiltTwoToneIcon fontSize='inherit'/>,
	},
	{
		title: 'מערכת נוחה ופשוטה',
		text: 'מערכת עיצוב הדף שלכם פשוטה וקלה לשימוש ועריכה!',
		icon: <DashboardCustomizeTwoToneIcon fontSize='inherit'/>,
	},

	{
		title: 'עיצובים מוכנים',
		text: 'בחירה מתוך מבחר עיצובים מוכנים לעמוד שלכם!',
		icon: <ViewSidebarTwoToneIcon fontSize='inherit'/>,
	},
	{
		title: 'פאנל ניהול',
		text: 'פאנל ניהול הכולל את הגדרות הדף, צפייה בנתוני כניסות, ועוד!',
		icon: <SettingsSuggestTwoToneIcon fontSize='inherit'/>,
	},
	{
		title: 'שינויים בלייב',
		text: 'צפייה בשינויים שלכם בזמן אמת, ללא צורך ברענון הדף או שמירה של השינויים!',
		icon: <PublishedWithChangesTwoToneIcon fontSize='inherit'/>,
	},
]

const Item = ({ title, text, icon }) => {
	return (
		<Tilt
			tiltMaxAngleX={15}
			tiltMaxAngleY={15}
			perspective={1000}
			transitionSpeed={1500}
			scale={1.05}
			gyroscope={true}
		>
			<div className='bg-white shadow-lg flex flex-col p-6 px-8 text-center rounded-2xl w-50'>
				{icon && <div className='items-center mb-1 text-5xl'> {icon} </div>}
				<span className='text-lg font-medium'> {title} </span>
				<span> {text} </span>
			</div>
		</Tilt>
	)
}

const Features = () => {
	return (
		<div className='relative bg-slate-100'>
			<div className='container z-20 py-12 relative'>
				<div className='grid grid-cols-3 gap-16 '>
					{items.map((i) => (
						<Item
							title={i.title}
							text={i.text}
							icon={i.icon}
							key={i.title}
						/>
					))}
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
