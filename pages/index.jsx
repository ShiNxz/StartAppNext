import Navbar from '@/components/Index/Navbar'
import Footer from '@/components/Index/Footer'
import Head from 'next/head'
import Main from '@/components/Index/Sections/Main'
import Features from '@/components/Index/Sections/FeaturesMain'
import FeaturesSecond from '@/components/Index/Sections/FeaturesSecond'
import ExamplePages from '@/components/Index/Sections/ExamplePages'
import Stats from '@/components/Index/Sections/Stats'
import PriceTables from '@/components/Index/Sections/PriceTables'
import FAQ from '@/components/Index/Sections/FAQ'
import Newsletter from '@/components/Index/Sections/Newsletter'
import News from '@/components/Index/Sections/News'

const Block = ({ children }) => {
	return <div>{children}</div>
}

const blocks = [
	{
		name: 'Main',
		component: <Main />,
	},
	{
		name: 'Features',
		component: <Features />,
	},
	{
		name: 'FeaturesSecond',
		component: <FeaturesSecond />,
	},
	{
		name: 'ExamplePages',
		component: <ExamplePages />,
	},
	{
		name: 'Stats',
		component: <Stats />,
	},
	{
		name: 'News',
		component: <News />,
	},
	{
		name: 'PriceTables',
		component: <PriceTables />,
	},
	{
		name: 'FAQ',
		component: <FAQ />,
	},
	{
		name: 'Newsletter',
		component: <Newsletter />,
	},
]

const Home = () => {
	return (
		<>
			<Head>
				<title>StartApp | ברוכים הבאים!</title>
			</Head>

			<Navbar />

			<main className='mt-16 min-h-unset'>
				{blocks.map((b) => (
					<Block key={b.name}> {b.component} </Block>
				))}
			</main>

			<Footer />
		</>
	)
}

export default Home
