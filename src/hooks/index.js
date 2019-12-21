import { useState } from 'react'

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const resetValue = () => {
        setValue('')
    }

    return {
        type, 
        value,
        onChange, 
        resetValue
    }
}

export default useField