import { createTheme as createNextUITheme } from '@nextui-org/react'
import createCache from '@emotion/cache'
import { createTheme as createMuiTheme, ThemeProvider } from '@mui/material/styles'
import { prefixer } from 'stylis'
import { CacheProvider } from '@emotion/react'
import rtlPlugin from 'stylis-plugin-rtl'
import { NextUIProvider } from '@nextui-org/react'

// MUI
const cacheRtl = createCache({
	key: 'muirtl',
	stylisPlugins: [prefixer, rtlPlugin],
})

const muiTheme = createMuiTheme({
	direction: 'rtl',
	typography: {
		fontFamily: 'Rubik',
	},
})

// NextUI
const fonts = {
	sans: "'Rubik', Rubik, sans-serif;",
}

const sharedTheme = {
	theme: {
		fonts,
		colors: {
			secondaryLight: '$cyan200',
			secondaryLightHover: '$cyan300', // commonly used on hover state
			secondaryLightActive: '$cyan400', // commonly used on pressed state
			secondaryLightContrast: '$cyan600', // commonly used for text inside the component
			secondary: '$cyan600',
			secondaryBorder: '$cyan500',
			secondaryBorderHover: '$cyan600',
			secondarySolidHover: '$cyan700',
			secondarySolidContrast: '$white', // commonly used for text inside the component
			secondaryShadow: '$cyan500',
		},
		letterSpacings: {
			tighter: '0em',
		},
		fontSizes: {
			md: '1.2rem'
		}
	},
}

export const lightTheme = createNextUITheme({
	...sharedTheme,
	type: 'light',
})

export const darkTheme = createNextUITheme({
	...sharedTheme,
	type: 'dark',
	className: 'dark',
})

export default ({ children }) => {
	return (
		<NextUIProvider theme={lightTheme}>
			<CacheProvider value={cacheRtl}>
				<ThemeProvider theme={muiTheme}>
					{children}
				</ThemeProvider>
			</CacheProvider>
		</NextUIProvider>
	)
}