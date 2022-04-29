const Banner = ({ banner }) => {
    return (
        <div
            id='banner'
            style={{backgroundImage: `${typeof banner !== 'undefined' && `url('/uploads/${banner}')`}`}}
            className='w-full z-10 h-80 bg-cover bg-no-repeat bg-center bg-gradient-to-r from-cyan-500 to-blue-500'
        />
    )
}

export default Banner