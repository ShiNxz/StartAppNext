const Button = ({ style, children, onClick, type, className, disabled, loading, outline, size }) => {
	switch (style) {
		default:
			style = `bg-purple-500 border-purple-500 ${
				outline ? 'text-purple-500' : ''
			} border-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200`
			break

		case 'purple':
			style = `bg-purple-500 border-purple-500 ${
				outline ? 'text-sky-purple' : ''
			} hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200`
			break

		case 'cyan':
			style = `bg-sky-500 border-sky-500 ${
				outline ? 'text-sky-500' : ''
			} border hover:bg-sky-600 focus:ring-sky-600 focus:ring-offset-sky-200 ${loading ? 'bg-sky-800' : ''}`
			break

		case 'blue':
			style = `bg-blue-500 hover:bg-blue-600 border-blue-500 ${
				outline ? 'text-blue-500' : ''
			} focus:ring-blue-400 focus:ring-offset-blue-200 ${loading ? 'bg-blue-900' : ''}`
			break
	}

	return (
		<button
			disabled={disabled || loading}
			type={type || 'submit'}
			onClick={onClick}
			className={`${
				outline ? 'bg-white/0 hover:!text-white' : ''
			} font-medium flex flex-row justify-center items-center py-2 px-4 ${style} text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${className} ${
				size === 'sm' ? 'text-sm py-1.5 px-3' : ''
			}`}
		>
			{loading ? (
				<>
					<svg
						className='animate-spin h-3 w-3 ml-2 text-white'
						viewBox='0 0 24 24'
					>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
						></path>
					</svg>
					אנא המתן...
				</>
			) : (
				children
			)}
		</button>
	)
}

export default Button