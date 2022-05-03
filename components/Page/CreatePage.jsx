import { useState, useContext } from 'react'

import InputForm from '@/components/UI/InputForm'
import Button from '@/components/UI/Button'

import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import { Divider } from '@mui/material'
import Axios from '@/utils/functions/Axios'
import { ProfileContext } from '@/pages/[user]';

const CreateProfile = () => {
    const { mutate } = useContext(ProfileContext)
    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({
        show: false,
        message: ""
    })

    const handleCreate = async (event) => {
        event.preventDefault()

        setLoading(true)

        const inputs = Inputs.map(i => {
            setAlert({
                show: false,
                message: ""
            })

            const valid = i.validate(i.value[0])
            if(valid !== true ) {
                setAlert({
                    show: true,
                    style: "error",
                    message: valid
                })
            }
            return { [i.id]: i.value[0] }
        })

        const { success } = await Axios('/api/profile/create', inputs, 'POST')

        if(success) {
            setAlert({
                show: true,
                style: "success",
                message: "העמוד נוצר בהצלחה! אנא המתן..."
            })

            setTimeout(async () => await mutate(), 2000)
        } else setAlert({
            show: true,
            style: "error",
            message: 'חלה שגיאה...'
        })

    }

    const Inputs = [
        {
            title: 'שם פרטי',
            id: 'name',
            helper: 'שם פרטי',
            value: [name, setName],
            validate: (name) => {
                return true
            }
        },
        {
            title: 'תפקיד',
            id: 'title',
            helper: '...',
            value: [title, setTitle],
            validate: (name) => {
                return true
            }
        },
    ]

    return (
        <div className='h-full inset-0 absolute flex justify-center items-center'>
			<div className='bg-slate-100 rounded-3xl py-8 px-12 text-center'>
                <h4>
                    פתיחת עמוד
                </h4>

                <Divider className='my-4' />

                <p className='my-6'>
                    על מנת לפתוח עמוד יש
                </p>
				<form onSubmit={handleCreate}>
                    <Collapse in={alert.show}>
    	                <Alert severity={alert.style} sx={{ mb: 4 }}>{alert.message}</Alert>
    	            </Collapse>

                    {
                        Inputs.map(i => 
                            <InputForm
                                key={i.id}
                                title={i.title}
                                id={i.id}
                                helper={i.helper}
                                value={i.value}
                                validate={i.validate}
                                variant='outlined'
                                className='!mb-12'
                                required
                            />
                        )
                    }

                    <Button loading={loading} style="cyan" type='submit' className='w-full'>פתיחת פרופיל</Button>
                </form>
			</div>
		</div>
    )
}

export default CreateProfile