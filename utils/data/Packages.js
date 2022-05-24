// Price Packages
import Button from '@/Next/Button'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const Packages = [
	{
		title: (
			<p className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 text-3xl font-medium mb-3 mt-1'>
				דף אישי
			</p>
		),
		price: 0,
		description: 'אדיפיסינג אלית לפרומי בלוף קינץ תתיח לרעח. לורם איפסום דולור סיט אמט...',
		// make on click event
		button: (
			<Button
				color='primary'
				className='mt-8 !w-full'
			>
				הרשמה
				<KeyboardBackspaceIcon className='mr-3' />
			</Button>
		),
		advantages: [
			{
				title: 'אדיפיסינג אלית לפרומי',
				include: true,
			},
			{
				title: 'אדיפיסינג אלית לפרומי',
				include: true,
			},
			{
				title: 'אדיפיסינג אלית לפרומי',
				include: true,
			},
			{
				title: 'אדיפיסינג אלית לפרומי',
				include: true,
			},
			{
				title: 'אדיפיסינג אלית לפרומי',
				include: false,
			},
		],
	},
	{
		title: (
			<p className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 text-3xl font-medium mb-3 mt-1'>
				דף עסקי
			</p>
		),
		price: 20,
		description: 'אדיפיסינג אלית לפרומי בלוף קינץ תתיח לרעח. לורם איפסום דולור סיט אמט...',
		button: (
			<Button
				css={{ background: '$purple', color: '$purpleSolidContrast' }}
				color='yellow'
				className='mt-8 !w-full'
			>
				מעבר לרכישה
				<KeyboardBackspaceIcon className='mr-3' />
			</Button>
		),
		advantages: [
			{
				title: 'אדיפיסינג אלית לפרומי',
				include: true,
			},
			{
				title: 'אדיפיסינג אלית לפרומי',
				include: true,
			},
			{
				title: 'אדיפיסינג אלית לפרומי',
				include: true,
			},
			{
				title: 'אדיפיסינג אלית לפרומי',
				include: true,
			},
			{
				title: 'אדיפיסינג אלית לפרומי',
				include: false,
			},
		],
	},
	{
		title: (
			<p className='text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 text-3xl font-medium mb-3 mt-1'>
				אתר עסקי
			</p>
		),
		price: -1,
		description: 'אדיפיסינג אלית לפרומי בלוף קינץ תתיח לרעח. לורם איפסום דולור סיט אמט...',
		button: (
			<Button
				css={{ background: '$yellow', color: '$yellowSolidContrast' }}
				color='yellow'
				className='mt-8 !w-full'
			>
				צור קשר
				<KeyboardBackspaceIcon className='mr-3' />
			</Button>
		),
		advantages: [
			{
				title: 'אדיפיסינג אלית לפרומי',
				include: true,
			},
			{
				title: 'אדיפיסינג אלית לפרומי',
				include: true,
			},
			{
				title: 'אדיפיסינג אלית לפרומי',
				include: true,
			},
			{
				title: 'אדיפיסינג אלית לפרומי',
				include: true,
			},
			{
				title: 'אדיפיסינג אלית לפרומי',
				include: true,
			},
		],
	},
]

export default Packages
