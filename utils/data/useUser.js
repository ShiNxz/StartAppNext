import useSWR from 'swr'
import axios from 'axios'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'

const getUser = () => axios.get(`/api/auth/auth`).then(res => res.data)

const useUser = () => {
  const Router = useRouter()
  const { data, mutate, error } = useSWR("useUser", getUser)

  const loading = !data && !error
  const loggedIn = !error && data

  const logout = () => {
    cookie.remove('token')
    Router.push('/')
    mutate()
  }

  return { loading, loggedIn, user: data, mutate, logout }
}

export default useUser