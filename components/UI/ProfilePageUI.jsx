const ProfilePageUI = ({ user }) => {
    return <>
        <div style={{backgroundImage: 'url(https://img.freepik.com/free-vector/abstract-website-banner-with-modern-shapes_1361-1738.jpg)'}} className='w-full z-10 h-80 bg-cover bg-no-repeat bg-center'/>

        <div className="container mx-auto z-20 -mt-16 bg-white h-44 rounded-3xl shadow-lg flex p-4 px-12">
            <div className="-mt-14">
                <img className="w-[10rem] h-[10rem] rounded-[2.5rem] border-4 border-white shadow-md" src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg" alt="asd" />
            </div>
            <div className="p-4 px-8 w-1/3">
                <span className="block font-semibold text-gray-700 text-2xl">{ user.name }</span>
                <span className="block text-gray-500 ">דגעדגכ</span>
            </div>
            <div className="p-4 px-8 w-1/3">
                <span className="block font-semibold text-gray-700 text-2xl">אמיר אליז</span>
                <span className="block text-gray-500 ">דגעדגכ</span>
            </div>
        </div>
        <div className="container mx-auto z-20 bg-white h-44 rounded-3xl shadow-lg flex p-4 px-12 mt-8">

        </div>
    </>
}

export default ProfilePageUI