import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'

const InputForm = ({ id, title, type, value, className, error, variant, loading, helper, required, InputProps }) => {
	return (
		<FormControl className={`!mx-4 ${className || ''}`}>
			<TextField
				label={title}
				variant={variant || 'standard'}
				id={`input-${id}`}
				value={value[0]}
				onChange={(e) => value[1](e.target.value)}
				error={error ? true : false}
				helperText={error || helper}
				type={type || 'text'}
				required={required || false}
				InputProps={InputProps}
				autoComplete='off'
			/>
			{loading && (
				<CircularProgress
					size={24}
					className='text-blue-700 absolute top-1/2 -mt-5 -lt-3 w-4 left-4'
				/>
			)}
		</FormControl>
	)
}

export default InputForm
