import SettingsInputs from '@/utils/page/SettingsInputs'
import SettingsInput from '../Inputs/Input'
import useUser from '@/data/useUser'
import { Title } from './Tabs'

const MainInformation = () => {
	const { loggedIn, user } = useUser()

	return loggedIn ? (
		<>
			<Title
				title='הגדרות כלליות'
				des='פרטי זיהוי'
			/>
			
			{SettingsInputs.main.map((s) => (
				<SettingsInput
					key={s.name}
					name={s.name}
					title={s.title}
					initValue={user?.page?.[s.name]}
					helper={s.helper}
					validate={s.validate}
					className={s.className}
				/>
			))}
			
			<Title
				title='כתובת מותאמת אישית'
				des='פרטי זיהוי'
			/>

			{SettingsInputs.customLink.map((s) => (
				<SettingsInput
					key={s.name}
					name={s.name}
					title='כתובת מותאמת אישית'
					initValue={user?.page?.[s.name]}
					helper={s.helper}
					validate={s.validate}
					className={s.className}
					InputProps={s.InputProps}
				/>
			))}

			<Title title='פרטי קשר' />
			<Title title='רשתות חברתיות' />
		</>
	) : <></>
}

export default MainInformation