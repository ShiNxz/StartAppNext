import Navbar from '@/components/Index/Navbar'
import Footer from '@/components/Index/Footer'
import Head from 'next/head'
import Form from '@/components/Contact/Form'

const Home = () => {
	return (
		<>
			<Head>
				<title>StartApp | צור קשר</title>
			</Head>

			<Navbar />

			<main className='mt-16 flex min-h-full'>
				<div className='bg-white container m-auto p-16 py-12 rounded-lg my-20'>
					<h2>שליחת פנייה</h2>
					<p className='mt-1'>שליחת פנייה לקבלת מענה בכל נושא, יש למלא את הפרטים הבאים ולהמתין לתשובה.</p>

					<Form />

				</div>
			</main>

			<Footer />
		</>
	)
}

export default Home
