import { isNumber } from "my-utilities"
import { ChangeEvent, useCallback, useState } from "react"

const useForm = <T extends object>(values: T) => {

    const [form, setForm] = useState(values)

    const onChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }, [])

    const resetValue = useCallback((property: keyof T) => {
        setForm((prev) => ({
            ...prev,
            [property]: isNumber(values) ? 0 : ""
        }))
    } , [])
    return {
        onChange,
        form,
        resetValue
    }
}

export default useForm