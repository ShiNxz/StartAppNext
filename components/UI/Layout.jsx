import LoadingBar from 'react-top-loading-bar'
import { useContext, useEffect } from 'react'

import userContext from '@/data/UserContext'
import AppContext from '@/data/AppContext'
import Loading from '@/components/UI/LoadingBackdrop'
import FloatingBar from './FloatingBar'

const Layout = ({ children }) => {
	const { loading: userLoading } = useContext(userContext)
	const { loading: appLoading, layout, setLayout, setProgress, progress } = useContext(AppContext)

	useEffect(() => {
		appLoading && setProgress(30)
		!appLoading && setProgress(100)
	}, [appLoading])

	return (
		<>
			<Loading loading={appLoading} />
			<LoadingBar
				color='#0099ff'
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
			/>
			{children}
		</>
	)
}

export default Layout
