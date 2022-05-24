import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import AboutMe, { AboutMeSettings } from '@/components/Page/BlockTypes/AboutMe'
import Carousel, { CarouselBlockSettings } from '@/components/Page/BlockTypes/Carousel'
import CustomTextBox, { CustomTextBoxSettings } from '@/components/Page/BlockTypes/CustomTextBox'
import RegularGallery, { RegularGallerySettings } from '@/components/Page/BlockTypes/Gallery'
import ContactForm, { ContactSettings } from '@/components/Page/BlockTypes/ContactForm'
import Skills, { SkillsSettings } from '@/components/Page/BlockTypes/Skills'

export default [
	{
		id: 'aboutMe',
		name: 'אודות',
		description: 'פירוט קצר על עצמך',
		icon: <PersonOutlineIcon className='mb-0.5 !text-5xl' />,
		// TODO tags - show as badges after the description
		variables: [
			{
				identifier: 'text',
				title: 'פירוט על עצמך.....',
				maxLength: 30,
				minLength: 5,
				rows: 8,
				defaultValue: 'יש לערוך...',
				description: 'תיאור.....',
				validation: (input) => {
					if (input === '') return 'יש להקליד שם'
					if (input?.length >= 10) return 'ניתן לבחור כתובת בעלת מקסימום 10 תוים!'
					return true
				},
			},
		],
		component: AboutMe,
		settingsComponent: AboutMeSettings,
	},
	{
		id: 'carousel',
		name: 'גלרייה',
		description: 'גלריית תמונות בסגנון קרוסלה',
		icon: <PersonOutlineIcon className='mb-0.5 !text-5xl' />,
		variables: [
			{
				identifier: 'pictures',
				title: 'תמונות',
				defaultValue: [],
			},
		],
		component: Carousel,
		settingsComponent: CarouselBlockSettings,
	},
	{
		id: 'gallery',
		name: 'גלרייה',
		description: 'גלריית תמונות בסגנון רגיל',
		icon: <PersonOutlineIcon className='mb-0.5 !text-5xl' />,
		variables: [
			{
				identifier: 'pictures',
				title: 'תמונות',
				defaultValue: [],
			},
		],
		component: RegularGallery,
		settingsComponent: RegularGallerySettings,
	},
	{
		id: 'customTextBox',
		name: 'בלוק טקסט',
		description: 'בלוק טקסט מותאם אישית',
		icon: <PersonOutlineIcon className='mb-0.5 !text-5xl' />,
		variables: [
			{
				identifier: 'title',
				title: 'כותרת',
				maxLength: 30,
				minLength: 2,
				rows: 1,
				defaultValue: 'כותרת',
				description: 'תיאור.....',
				validation: (input) => {
					if (input === '') return 'יש להקליד שם'
					if (input?.length >= 10) return 'ניתן לבחור כתובת בעלת מקסימום 10 תוים!'
					return true
				},
			},
			{
				identifier: 'text',
				title: 'פירוט על עצמך.....',
				maxLength: 30,
				minLength: 5,
				rows: 8,
				defaultValue: 'יש לערוך...',
				description: 'תיאור.....',
				validation: (input) => {
					if (input === '') return 'יש להקליד שם'
					if (input?.length >= 10) return 'ניתן לבחור כתובת בעלת מקסימום 10 תוים!'
					return true
				},
			},
		],
		component: CustomTextBox,
		settingsComponent: CustomTextBoxSettings,
	},
	{
		id: 'skills',
		name: 'ניסיון',
		description: 'בחר תחום ואחוז ניסיון',
		icon: <PersonOutlineIcon className='mb-0.5 !text-5xl' />,
		variables: [
			{
				identifier: 'title',
				title: 'כותרת',
				maxLength: 30,
				minLength: 2,
				rows: 1,
				defaultValue: 'כותרת',
				description: 'תיאור.....',
				validation: (input) => {
					if (input === '') return 'יש להקליד שם'
					if (input?.length >= 10) return 'ניתן לבחור כתובת בעלת מקסימום 10 תוים!'
					return true
				},
			},
			{
				identifier: 'stuffs',
				title: 'תחומים',
				defaultValue: [],
			},
		],
		component: Skills,
		settingsComponent: SkillsSettings,
	},
	{
		id: 'contactForm',
		name: 'צור קשר',
		tags: [],
		description: 'טופס יצירת קשר',
		icon: <PersonOutlineIcon className='mb-0.5 !text-5xl' />,
		variables: [
			{
				identifier: 'notes',
				title: 'הערות',
				maxLength: 30,
				minLength: 2,
				rows: 1,
				defaultValue: 'הערות - ניתן לערוך',
				description: 'הטקסט שיופיע תחת הכותרת, ניתן לרשום הערות כמו "תשובה עד 48 שעות"',
				validation: (input) => {
					if (input?.length >= 200) return 'ניתן לרשום עד 200 תוים!'
					return true
				},
			}
		],
		component: ContactForm,
		settingsComponent: ContactSettings,
	},
]
