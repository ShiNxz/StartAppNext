import InputAdornment from '@mui/material/InputAdornment'

export default {
	main: [
		{
			name: 'name',
			title: 'שם פרטי',
			helper: 'השם שיוצג בפרופיל',
			unique: false, // TODO make it check db
			validate: (input) => {
				if (input === '') return 'יש להקליד שם'
				if (input === '123') return '123error'
				return true
			},
			className: '!mb-12',
			role: 1 // TODO make it check db + client
		},
		{
			name: 'title',
			title: 'תפקיד',
			helper: 'כותרת',
			validate: (input) => {
				if (input === '') return 'יש להקליד שם'
				if (input === '123') return '123error'
				return true
			},
			className: '!mb-12',
			role: 1
		},
	],
	customLink: [
		{
			name: 'customLink',
			title: 'כתובת מותאמת אישית',
			helper: 'לדוגמה: https://startapp.org.il/XXX',
			unique: true, // TODO make it check db
			validate: (input) => {
				if (input === '') return 'יש להקליד שם'
				if (input === '123') return '123error'
				return true
			},
			InputProps: {
				endAdornment: <InputAdornment position='end'>/startapp.org.il</InputAdornment>,
			},
			className: '!mb-12 !w-full',
			role: 1
		},
	],
	images: [
		{
			title: 'תמונת פרופיל',
			description: 'התמונה אשר תוצג בפרופיל',
			inputName: 'avatar',
			role: 1,
		},
		{
			title: 'באנר',
			description: 'התמונה אשר תוצג ברקע',
			inputName: 'banner',
			role: 2
		},
	]
}
