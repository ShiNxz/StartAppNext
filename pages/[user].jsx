import ProfilePageUI from '@/components/UI/ProfilePageUI'
import fetcher from '@/utils/fetcher'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const Profile = () => {
	const router = useRouter()
	const { user } = router.query
		
	const { data, error } = useSWR(`/api/profile/${user}`, fetcher)

	console.log(data, error)
	return !data && !error ? <>Loading...</> : !data ? <>Error</> : <ProfilePageUI user={data.user}>
		
	</ProfilePageUI>
}

export default Profile