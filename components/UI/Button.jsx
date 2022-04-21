const Button = ({ style, children, onClick, type, className, disabled, loading }) => {

    switch(style) {
        default:
            style = `bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200`
        break

        case 'purple':
            style = `bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200`
        break

        case 'blue':
            style = `bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200`
        break
    }

    return <button disabled={ disabled || loading } type={type || "submit"} onClick={onClick} className={`flex flex-row justify-center items-center py-2 px-4 ${style} text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${className}`}>
        {
            loading ?
                <>
                    <svg className="animate-spin h-3 w-3 ml-2 text-white" viewBox="0 0 24 24"><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    אנא המתן...
                </> : children
        }
    </button>
}

export default Button