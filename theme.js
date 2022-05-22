import { createTheme } from '@nextui-org/react'

const fonts = {
	sans: 'Rubik',
}

const sharedTheme = {
	theme: {
		fonts,
	},
}

export const lightTheme = createTheme({
	...sharedTheme,
	type: 'light',
})

export const darkTheme = createTheme({
	...sharedTheme,
	type: 'dark',
})
