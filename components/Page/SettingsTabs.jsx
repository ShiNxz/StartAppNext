// Imports
import useUser from '@/data/useUser'
import SettingsInput from './Settings/Input'
import ImageInput from './Settings/ImageInput'
import InputAdornment from '@mui/material/InputAdornment'

const Title = ({ title, des }) => (
	<>
		<h5 className='settings_title mb-0'> {title} </h5>
		{des && <p className='text-center mb-6 text-sm text-gray-600'> {des} </p>}
	</>
)

const MainInformation = () => {
	const { loggedIn, user } = useUser()

	const settings = [
		{
			name: 'name',
			title: 'שם פרטי',
			initValue: user?.page?.name,
			helper: 'השם שיוצג בפרופיל',
			validate: (input) => {
				if (input === '') return 'יש להקליד שם'
				if (input === '123') return '123error'
				return true
			},
		},
		{
			name: 'title',
			title: 'תפקיד',
			initValue: user?.page?.title,
			helper: 'כותרת',
			validate: (input) => {
				if (input === '') return 'יש להקליד שם'
				if (input === '123') return '123error'
				return true
			},
		},
	]

	return (
		<>
			<Title
				title='הגדרות כלליות'
				des='פרטי זיהוי'
			/>
			{loggedIn ? (
				<>
					{settings.map((s) => (
						<SettingsInput
							key={s.name}
							name={s.name}
							title={s.title}
							initValue={s.initValue}
							helper={s.helper}
							validate={s.validate}
							className='!mb-12'
						/>
					))}
				</>
			) : (
				<>Loading...</>
			)}
			<Title
				title='כתובת מותאמת אישית'
				des='פרטי זיהוי'
			/>
			<SettingsInput
				name='customLink'
				title='כתובת מותאמת אישית'
				initValue={user?.page?.customLink}
				helper='לדוגמה: https://startapp.org.il/XXX'
				validate={(input) => {
					if (input === '') return 'יש להקליד שם'
					if (input?.length >= 10) return 'ניתן לבחור כתובת בעלת מקסימום 10 תוים!'
					return true
				}}
				className='!mb-12 !w-full'
				InputProps={{ endAdornment: <InputAdornment position='end'>/startapp.org.il</InputAdornment> }}
				sx={{ direction: 'ltr' }}
			/>

			<Title title='פרטי קשר' />
			<Title title='רשתות חברתיות' />
		</>
	)
}

const BannerSettings = () => {
	return (
		<>
			<h1 className='settings_title'>תמונה</h1>
			<ImageInput name='avatar' />

			<h1 className='settings_title'>באנר</h1>
			<ImageInput name='banner' />
		</>
	)
}

const Tabs = [
	{
		name: 'הגדרות כלליות',
		component: <MainInformation />,
	},
	{
		name: 'תמונה ובאנר',
		component: <BannerSettings />,
	},
	{
		name: 'תמונה ובאנר 2',
		component: <BannerSettings />,
		bought: true,
	},
]

export default Tabs