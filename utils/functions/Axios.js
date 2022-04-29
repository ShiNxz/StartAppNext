import axios from 'axios'



const Axios = async (url, data = {}, method = 'GET', type = 'application/json;charset=UTF-8') => {
    method = method || 'GET'

    const headers = {
        "Accept": "application/json",
        "Content-Type": type,
    }

    try {
        const fetch = await axios({
            method,
            url,
            headers,
            data
        })

        return { success: fetch.data.success, error: fetch.data.error, status: fetch.status, data: fetch.data }

    } catch (error) {
        return { success: false, error }
    }
}

export default Axios