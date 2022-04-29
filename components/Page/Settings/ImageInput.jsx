import { useState, useContext } from 'react'
import { ProfileContext } from '@/pages/[user]'

import Button from '@/UI/Button'
import Axios from '@/utils/functions/Axios'

import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'

const ImageInput = ({ name }) => {
    const { mutate } = useContext(ProfileContext)

    const [selectedFile, setSelectedFile] = useState(null)

    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({
        show: false,
        message: ""
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        setAlert({
            show: false,
            message: ""
        })

        const formData = new FormData()
        formData.append(name, selectedFile)

        const { success } = await Axios(`/api/profile/${name}`, formData, 'POST', 'multipart/form-data')

        setTimeout(async () => {
            if(success)
                setAlert({
                    show: true,
                    style: "success",
                    message: "התמונה נוספה בהצלחה!"
                })
            else
                setAlert({
                    show: true,
                    style: "error",
                    message: 'חלה שגיאה...'
                })

            mutate && await mutate()
            setLoading(false)

        }, 2000)

    }

    return (
        <>
            <Collapse in={alert.show}>
        	    <Alert severity={alert.style} sx={{ width: '24rem', margin: 'auto', mb: 2 }}>{alert.message}</Alert>
        	</Collapse>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-center items-center flex-col text-center mb-3 w-96 m-auto">
                    <input className="
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="file"
                        id="formFile"
                        onChange={() => setSelectedFile(event.target.files[0]) }
                        accept='image/png, image/gif, image/jpeg'
                    />
                </div>

                <Collapse in={loading}>
                    <Box sx={{ width: '24rem', margin: 'auto', mb: '10px' }}>
                        <LinearProgress />
                    </Box>
                </Collapse>

                <Button loading={loading} type="submit" className='w-96 m-auto mb-10'>שמירה</Button>
            </form>
        </>
    )
}

export default ImageInput