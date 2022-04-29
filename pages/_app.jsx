import '../styles/globals.scss'
import Head from 'next/head'
import Layout from '@/components/UI/Layout'

import { AppContextProvider } from '@/data/AppContext'
import userContext from '@/data/UserContext'
import useUser from '@/data/useUser'

import createCache from '@emotion/cache'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { prefixer } from 'stylis'
import { CacheProvider } from '@emotion/react'
import rtlPlugin from 'stylis-plugin-rtl'

import { SnackbarProvider } from 'notistack'

import Collapse from '@mui/material/Collapse'

const cacheRtl = createCache({
	key: 'muirtl',
	stylisPlugins: [prefixer, rtlPlugin],
})

const theme = createTheme({
	direction: 'rtl',
	typography: {
		fontFamily: 'Rubik',
	},
})

const App = (props) => {
	const { Component, pageProps } = props
	const { loading, loggedIn, user, mutate, logout } = useUser()
	console.log(user)
	return (
		<>
			<Head>
				<title>StartApp</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>

			<CacheProvider value={cacheRtl}>
				<ThemeProvider theme={theme}>
					<AppContextProvider>
						<SnackbarProvider
							maxSnack={3}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
							TransitionComponent={Collapse}
						>
							<userContext.Provider value={{ loading, loggedIn, user, mutate, logout }}>
								<Layout>
									<Component {...pageProps} />
								</Layout>
							</userContext.Provider>
						</SnackbarProvider>
					</AppContextProvider>
				</ThemeProvider>
			</CacheProvider>
		</>
	)
}

export default App
