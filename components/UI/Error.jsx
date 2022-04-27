const ProfileNotExists = ({ text }) => {
    return (
        <div className='h-full inset-0 absolute flex justify-center items-center'>
			<div className='bg-slate-100 rounded-3xl py-8 px-52 text-center'>
				<h4>שגיאה!</h4>
                <p className="mb-12">
                    { text }
                </p>
                <a className="text-sm">צור דף עסקי משלך!</a>
			</div>
		</div>
    )
}

export default ProfileNotExists