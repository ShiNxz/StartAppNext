import Login from '@/components/Auth/Login'
import AppContext from '@/data/AppContext'
import Head from 'next/head'
import { useContext } from 'react'

function LoginPage() {
	const { setLoading } = useContext(AppContext)
	setLoading(false)
	return (
		<div>
			<Head>
				<title>Welcome to landing page</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>

			<div className='flex justify-center bg-slate-200 p-96'>
				<Login/>
			</div>
		</div>
	)
}

export default LoginPage
