import '../styles/globals.scss'
import Head from 'next/head'
import { AppContextProvider } from '@/data/AppContext'
import userContext from '@/data/UserContext'
import useUser from '@/data/useUser'
import { SnackbarProvider } from 'notistack'
import Collapse from '@mui/material/Collapse'
import { useMemo } from 'react'
import ThemeContext from '@/utils/data/ThemeContext'

const App = (props) => {
	const { Component, pageProps } = props
	const { loading, loggedIn, user, mutate, logout } = useUser()
	const userValues = useMemo(() => ({ loading, loggedIn, user, mutate, logout }), [loading, loggedIn, user])

	return (
		<>
			<Head>
				<title>StartApp</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>

			<ThemeContext>
				<AppContextProvider>
					<SnackbarProvider
						maxSnack={3}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
						TransitionComponent={Collapse}
					>
						<userContext.Provider value={userValues}>
							<Component {...pageProps} />
						</userContext.Provider>
					</SnackbarProvider>
				</AppContextProvider>
			</ThemeContext>
		</>
	)
}

export default App
