import InputForm from '@/components/UI/InputForm'
import { useState, useEffect, useCallback, useContext } from 'react'
import Axios from '@/utils/functions/Axios'
import debounce from '@/utils/functions/Debounce'
import { ProfileContext } from '@/pages/[user]'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'

const SettingsInput = ({ name, initValue, helper, title, validate, className, sx, InputProps }) => {
	const [value, setValue] = useState(initValue)
	const [saved, setSaved] = useState()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const { mutate } = useContext(ProfileContext)

	const handleChange = useCallback(
		debounce(async (options) => {
			setLoading(true)
			const { success, data } = await Axios('/api/profile/edit', { options }, 'POST')
			console.log(success)
			setSaved({ success, data })
			!success && setError(saved?.data?.message)
			success && mutate && (await mutate())
			setLoading(false)
		}),
		[]
	)

	useEffect(() => {
		if (value && value === initValue || typeof value === 'undefined') return;

		const validation = validate(value)

		if (validation === true) {
			handleChange({ [name]: value })
			return () => {
				setError(false)
			}
		} else
			return () => {
				setError(validation)
			}
	}, [value])

	return (
		<InputForm
			loading={loading}
			helper={
				loading ? (
					<Box sx={{ width: '100%', margin: 'auto', mb: '10px' }}>
                        <LinearProgress />
                    </Box>
				) :
				saved ? (
					<span className={`${saved?.success ? 'text-green-700' : 'text-red-700'} font-medium`}>
						{saved?.data?.message}
					</span>
				) : (
					helper
				)
			}
			error={error}
			title={title}
			id={name}
			value={[value, setValue]}
			variant='outlined'
			className={className}
			InputProps={InputProps}
			sx={sx}
		/>
	)
}

export default SettingsInput