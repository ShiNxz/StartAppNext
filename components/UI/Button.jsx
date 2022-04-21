
const Button = (props) => {

    let style

    switch(props.style) {
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

    return <button type={props.type || "submit"} onClick={props.onClick} className={`py-2 px-4 ${style} text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${props.className}`}>
        { props.children }
    </button>
}

export default Button