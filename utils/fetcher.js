import axios from 'axios'

export default (url) => axios.get(url).then(res => res.data)