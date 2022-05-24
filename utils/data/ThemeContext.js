import { createTheme as createNextUITheme, NextUIProvider } from '@nextui-org/react'
import createCache from '@emotion/cache'
import { createTheme as createMuiTheme, ThemeProvider } from '@mui/material/styles'
import { prefixer } from 'stylis'
import { CacheProvider } from '@emotion/react'
import rtlPlugin from 'stylis-plugin-rtl'

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
	sans: "'Rubik', sans-serif;",
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

			yellowLight: '$yellow200',
			yellowLightHover: '$yellow300', // commonly used on hover state
			yellowLightActive: '$yellow400', // commonly used on pressed state
			yellowLightContrast: '$yellow600', // commonly used for text inside the component
			yellow: '$yellow600',
			yellowBorder: '$yellow500',
			yellowBorderHover: '$yellow600',
			yellowSolidHover: '$yellow700',
			yellowSolidContrast: '$white', // commonly used for text inside the component
			yellowShadow: '$yellow500',

			purpleLight: '$purple200',
			purpleLightHover: '$purple300', // commonly used on hover state
			purpleLightActive: '$purple400', // commonly used on pressed state
			purpleLightContrast: '$purple600', // commonly used for text inside the component
			purple: '$purple600',
			purpleBorder: '$purple500',
			purpleBorderHover: '$purple600',
			purpleSolidHover: '$purple700',
			purpleSolidContrast: '$white', // commonly used for text inside the component
			purpleShadow: '$purple500',
		},
		letterSpacings: {
			tighter: '0em',
		},
		fontSizes: {
			md: '1.2rem'
		},
		space: {
			md: '0.01rem',
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