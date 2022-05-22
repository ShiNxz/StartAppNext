import bg_features_secondary from '@/public/assets/bg_features_secondary.png'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'

const Stat = () => {
	return (
		<div className='p-8 bg-white shadow-lg rounded-xl w-80 text-center'>
			<CountUp
						start={0}
						end={1000}
						delay={0}
						separator='.'
					>
						{({ countUpRef }) => (
							<span
								ref={countUpRef}
								className='text-5xl font-medium block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500'
							>
								1.000
							</span>
						)}
					</CountUp>
				
			<span className='font-medium'>עמודים שנוצרו</span>
		</div>
	)
}

const Stats = () => {
	return (
		<div className='relative text-center py-8 bg-slate-100'>
			<span className='font-medium text-2xl'>נתונים אחרונים</span>
			<div className='container z-20 grid grid-cols-3 relative place-items-center py-4'>
				<Stat />
				<Stat />
				<Stat />
			</div>
			<div
				style={{ backgroundImage: `url(${bg_features_secondary.src})` }}
				className='bg-cover bg-center h-full w-full opacity-[.10] absolute inset-0 z-0'
			/>
		</div>
	)
}

export default Stats
