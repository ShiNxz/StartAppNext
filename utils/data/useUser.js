import useSWR from 'swr'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import fetcher from '@/utils/fetcher';

const useUser = () => {
  const Router = useRouter()
  const { data, mutate, error } = useSWR('/api/auth/auth', fetcher)

  const loading = !data && !error
  const loggedIn = !!data?.userId && !error

  const logout = () => {
    cookie.remove('token')
    Router.push('/')
    mutate()
  }

  return { loading, loggedIn, user: data, mutate, logout }
}

export default useUser