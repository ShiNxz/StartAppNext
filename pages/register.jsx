import Register from '@/components/Auth/Register'
import Head from 'next/head'
import Router from 'next/router'
import Navbar from '@/components/Index/Navbar'
import Footer from '@/components/Index/Footer'

const RegisterPage = () => {
	return (
		<>
			<Head>
				<title>StartApp | הרשמה</title>
			</Head>

			<Navbar />

			<main className='mt-16 flex min-h-full'>
				<div className='bg-white container m-auto p-16 py-12 rounded-lg my-20'>
					<h2>הרשמה</h2>

					<Register/>
					<hr className='my-8' />
					<div className='text-center'>
						יש ברשותך כבר משתמש?
						<a
							onClick={() => Router.push('/login')}
							target='_blank'
							className='text-blue-500 underline hover:text-blue-700 mr-1'
						>
							מעבר להתחברות
						</a>
					</div>

				</div>
			</main>

			<Footer />
		</>
	)
}

export default RegisterPage