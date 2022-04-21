import { useState, useEffect } from 'react'
import { isStrongPassword } from 'validator'

import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const PasswordInput = ( props ) => {
    const [ error, setError ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)
    const [ validate, setValidate ] = useState(false)

    const handleChange = (status) => {
        setError(false)
        
        if(isStrongPassword(status.target.value, { minLength: 6, maxLength: 24, minLowercase: 1, minUppercase: 0, minNumbers: 1, minSymbols: 0 }))
            setValidate({
                validate: true,
                input: status.target.value.trim().toLowerCase()
            })
        else {
            setError('על הסיסמה להיות בעלת 6 - 24 תוים, ולכלול מספר ואות אחת!')
            setValidate(false)
        }
    }

    useEffect(() => {
        props.status(validate)
    }, [ validate ])

    return <div className="my-2">
        <label htmlFor={props.id}>{props.name}</label>
        <input type={showPassword ? 'text' : 'password'} onChange={handleChange} id={props.id} className={`rounded-lg duration-200 border-transparent flex-1 appearance-none border border-gray-300 w-4/5 py-3 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 ${error ? "border-red-600 focus:ring-red-600" : validate.validate && "border-green-600 focus:ring-green-600"} focus:border-transparent`} name={props.id} placeholder={props.name}/>
        
        <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>

        <p className={`text-xs opacity-0 text-red-400 duration-200 px-1 pt-0.5 ${ error && "opacity-100" }`}>
            { error && error }
        </p>
    </div>
}

export default PasswordInput