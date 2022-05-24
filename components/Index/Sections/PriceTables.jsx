import bg_features_secondary from '@/public/assets/bg_features_secondary.png'
import Packages from '@/data/Packages'

const CheckMark = () => {
	return (
		<svg
			className='h-6 w-6 ml-2'
			xmlns='http://www.w3.org/2000/svg'
			width='6'
			height='6'
			stroke='currentColor'
			fill='#10b981'
			viewBox='0 0 1792 1792'
		>
			<path d='M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z'></path>
		</svg>
	)
}

const CrossMark = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='6'
			height='6'
			className='h-6 w-6 ml-2'
			fill='red'
			viewBox='0 0 1792 1792'
		>
			<path d='M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z'></path>
		</svg>
	)
}

const PriceTable = ({ title, description, price, advantages, button }) => {
	return (
		<div className='shadow-lg rounded-2xl w-[21rem] bg-white dark:bg-gray-800 p-6 text-right duration-300 hover:shadow-xl hover:-translate-y-1'>
			{title}
			{price != -1 ? (
				<p className='text-gray-900 dark:text-white text-3xl font-bold'>
					{price}₪<span className='text-gray-600 text-base font-thin mr-2'>/ חודש</span>
				</p>
			) : (
				<p className='text-gray-900 dark:text-white text-3xl font-bold'>צרו קשר</p>
			)}
			<p className='text-gray-600 dark:text-gray-100 text-sm mt-4'>{description}</p>
			<ul className='text-sm text-gray-600 dark:text-gray-100 mt-6 mb-6 mx-0'>
				{advantages.map(({ title, include }, i) => (
					<li
						className='mb-3 flex items-center'
						key={i}
					>
						{include ? <CheckMark /> : <CrossMark />} {title}
					</li>
				))}
			</ul>
			{button}
		</div>
	)
}

const PriceTables = () => {
	return (
		<div className='relative text-center py-8'>
			<span className='font-medium text-2xl'>הקימו דף עסקי משלכם!</span>

			<div className='container z-20 grid grid-cols-3 relative place-items-center py-6'>
				{Packages.map((p) => (
					<PriceTable
						key={p.price}
						title={p.title}
						description={p.description}
						price={p.price}
						advantages={p.advantages}
						button={p.button}
					/>
				))}
			</div>
			<div
				style={{ backgroundImage: `url(${bg_features_secondary.src})` }}
				className='bg-cover bg-center h-full w-full opacity-[.10] absolute inset-0 z-0'
			/>
		</div>
	)
}

export default PriceTables
