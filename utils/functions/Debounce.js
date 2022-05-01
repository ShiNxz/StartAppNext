const debounce = (func, delay = 500) => {
    let timer

    return (...args) => {
        const context = this
        timer && clearTimeout(timer)

        timer = setTimeout(() => {
            timer = null
            func.apply(context, args)
        }, delay)

    }
}

export default debounce