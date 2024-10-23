import { ChangeEvent, useCallback, useState } from "react"

const useForm = <T extends object>(values: T) => {

    const [form, setForm] = useState(values)

    const onChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    },[])

    return {
        onChange,
        form,
    }
}

export default useForm