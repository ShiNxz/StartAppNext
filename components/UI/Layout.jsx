import LoadingBar from 'react-top-loading-bar'
import { useContext, useEffect } from 'react'

import Navbar from '@/components/UI/Navbar'
import userContext from '@/data/UserContext'
import AppContext from '@/data/AppContext'

const Layout = ({ children }) => {
    const { loading } = useContext(userContext)
    const AppCon = useContext(AppContext)

    useEffect(() => {
        loading && AppCon.setProgress(30)
        !loading && AppCon.setProgress(100)
    }, [ loading ] )

    return <>
        <Navbar/>
        <LoadingBar color='#0099ff' progress={AppCon.progress} onLoaderFinished={() => AppCon.setProgress(0)} />
        <main>
            { children }
        </main>
        { // footer 
        }
        
    </>
}

export default Layout