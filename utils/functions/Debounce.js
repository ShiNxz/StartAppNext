const debounce = (func) => {
    let timer

    return (...args) => {
        const context = this
        timer && clearTimeout(timer)

        timer = setTimeout(() => {
            timer = null
            func.apply(context, args)
        }, 500)

    }
}

export default debounce