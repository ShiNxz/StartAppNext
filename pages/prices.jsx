import Head from 'next/head'
import Navbar from '@/components/Index/Navbar'
import Footer from '@/components/Index/Footer'
import PriceTables from '@/components/Index/Sections/PriceTables'
import FAQ from '@/components/Index/Sections/FAQ'

const PricesPage = () => {
	return (
		<>
			<Head>
				<title>StartApp | מחירים</title>
			</Head>

			<Navbar />

			<main className='mt-16 flex min-h-full'>
				<div className='m-auto rounded-lg w-full'>
					<PriceTables />
					<FAQ />
				</div>
			</main>

			<Footer />
		</>
	)
}

export default PricesPage
