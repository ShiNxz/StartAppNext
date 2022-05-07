import InputForm from '@/components/UI/InputForm'
import { useState, useEffect, useCallback, useContext } from 'react'
import Axios from '@/utils/functions/Axios'
import debounce from '@/utils/functions/Debounce'
import { ProfileContext } from '@/pages/[user]'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import useUser from '@/data/useUser'

const SettingsInput = ({ name, initValue, helper, title, validate, className, sx, InputProps, rows, multiline }) => {
	const [value, setValue] = useState(initValue)
	const [saved, setSaved] = useState()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const { mutate: userMutate } = useUser()
	const { mutate } = useContext(ProfileContext)

	const handleChange = useCallback(
		debounce(async (options) => {
			console.log(options)
			setLoading(true)
			const { success, data } = await Axios('/api/profile/edit', { options }, 'POST')

			setTimeout(async () => {
				!success && setError(saved?.data?.message)
				setSaved({ success, data })
				success && mutate && (await mutate())
				success && userMutate && (await userMutate())

				setTimeout(() => {
					setLoading(false)
				}, 300)

			}, 1000)
		}),
		[]
	)

	useEffect(() => {
		if ((value && value == initValue) || typeof value === 'undefined') return

		const validation = validate(value)
		console.log('before handleChange', validation)

		if (validation === true) {
			console.log('handleChange')
			handleChange({ [name]: value })
			setError(false)
		} else {
			setError(validation)
		}
	}, [value])

	return (
		<InputForm
			loading={loading}
			helper={
				loading ? (
					<Box sx={{ width: '100%', margin: 'auto', mb: '10px' }}>
						<LinearProgress color={!!error ? 'error' : saved?.success ? 'success' : 'info'} />
					</Box>
				) : saved ? (
					// <span className={`${saved?.success ? 'text-green-700' : 'text-red-700'} font-medium`}>
					saved?.data?.message
				) : (
					// </span>
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
			success={saved?.success}
			rows={rows}
			multiline={multiline}
		/>
	)
}

export default SettingsInput
