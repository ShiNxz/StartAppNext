import StarIcon from '@mui/icons-material/Star'
import CountUp from 'react-countup'

const ColoredBox = ({ style }) => {
	switch (style) {
		case 1:
			style = `from-blue-400 to-purple-400 shadow-pink-400/30`
			break

		case 2:
			style = `from-blue-400 to-purple-500 shadow-purple-500/30`
			break

		default:
			style = `from-orange-400 to-pink-400 shadow-pink-400/30`
			break
	}

	//!console.log(style)

	return (
		<div
			className={`inline-block relative overflow-hidden rounded-md text-white p-6 h-fit bg-gradient-to-br ${style} w-full shadow-xl`}
		>
			<span className='block drop-shadow-lg relative z-20'>צפיות בעמוד</span>
			<CountUp
				start={0}
				end={50000}
				delay={0}
				separator="."
			>
				{({ countUpRef }) => (
					<span ref={countUpRef} className='block text-left my-1 text-2xl tracking-widest drop-shadow-lg relative z-20' />
				)}
			</CountUp>
			<span className='block text-sm z-20 relative drop-shadow-lg'>כותרת משנית</span>
			<StarIcon
				sx={{ fontSize: '15rem' }}
				className='!absolute -bottom-24 -right-12 text-white/25 rotate-12'
			/>
		</div>
	)
}

export default ColoredBox
