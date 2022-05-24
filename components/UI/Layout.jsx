import Footer from '@/components/Page/UI/Footer'
import Navbar from '@/components/UI/Navbar'

const Layout = ({ def, children }) => {
	return def ? (
		<div className='flex flex-col content-between'>
			<Navbar />
			<main className='mt-14'> { children } </main>
			<Footer />
		</div>
	) : (
		<></>
	)
}

export default Layout