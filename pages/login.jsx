import Login from '@/components/Auth/Login'
import Head from 'next/head'
import Router from 'next/router'
import Navbar from '@/components/Index/Navbar'
import Footer from '@/components/Index/Footer'

const LoginPage = () => {
	return (
		<>
			<Head>
				<title>StartApp | התחברות</title>
			</Head>

			<Navbar />

			<main className='mt-16 flex min-h-full'>
				<div className='bg-white container m-auto p-16 py-12 rounded-lg my-20'>
					<h2>התחברות</h2>

					<Login />
					<hr className='my-8' />
					<div className='text-center'>
						אין ברשותך משתמש?
						<a
							onClick={() => Router.push('/register')}
							target='_blank'
							className='text-blue-500 underline hover:text-blue-700 mr-1'
						>
							מעבר להרשמה
						</a>
					</div>
				</div>
			</main>

			<Footer />
		</>
	)
}

export default LoginPage
