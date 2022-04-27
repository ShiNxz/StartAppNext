import InputForm from '@/components/UI/InputForm'
import { useState, useEffect, useCallback, useContext } from 'react'
import Axios from '@/utils/functions/Axios'
import debounce from '@/utils/functions/Debounce'
import { ProfileContext } from '@/pages/[user]'

const SettingsInput = ({ name, initValue, helper, title, validate, className }) => {
    const [value, setValue] = useState(initValue)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { mutate } = useContext(ProfileContext)

    const handleChange = useCallback(
        debounce(async options => {
            setLoading(true)
            await Axios('/api/profile/edit', { options }, 'POST')
            await mutate()
            setLoading(false)
        }), []
    )

    useEffect(() => {
        if(value && value === initValue) return;

        const validation = validate(value)

        if(validation === true) {
            handleChange({ [name]: value })
            return () => { setError(false) }
        }
        else
            return () => { setError(validation) }

    }, [value])

    return (
        <InputForm
            loading={loading}
            helper={helper}
            error={error}
            title={title}
            id={name}
            value={[value, setValue]}
            variant='outlined'
            className={className}
        />
    )
}

export default SettingsInput