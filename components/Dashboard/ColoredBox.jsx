import StarIcon from '@mui/icons-material/Star'

const ColoredBox = ({ style }) => {
    switch(style) {
        case 1:
            style = `from-blue-400 to-purple-400 shadow-pink-400/30`
        case 2:
            style = `from-blue-400 to-purple-500 shadow-purple-500/30`
        default:
            style = `from-orange-400 to-pink-400 shadow-pink-400/30`
    }

    console.log(style)

    return (
        <div className={`inline-block relative overflow-hidden rounded-md text-white p-6 h-fit bg-gradient-to-br ${style} w-full shadow-xl`}>
            <span className='block drop-shadow-lg'>צפיות בעמוד</span>
            <span className='block text-left my-1 text-2xl tracking-widest drop-shadow-lg'>50.000</span>
            <span className='block text-sm z-20 relative drop-shadow-lg'>כותרת משנית</span>
            <StarIcon sx={{fontSize: '15rem'}} className='!absolute -bottom-24 -right-12 text-white/25 rotate-12' />
        </div>
    )
}

export default ColoredBox