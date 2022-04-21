import axios from 'axios'

export const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json;charset=UTF-8",
}

const Axios = async (url, data = {}, method = 'GET') => {
    method = method || 'GET'

    try {
        const fetch = await axios({
            method,
            url,
            headers,
            data
        })

        return { success: true, status: fetch.status, data: fetch.data }

    } catch (error) {
        return { success: false, error }
    }
}

export default Axios