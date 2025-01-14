import { ChangeEvent, useCallback, useState } from "react";

type SetFormValue<T extends object> = (
    cb: ((v: T) => T)
) => void;

const useForm = <T extends object>(values: T) => {

    const [form, setForm] = useState(values)

    const onChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }, [])

    const setValue: SetFormValue<T> = useCallback((cb) => {
        setForm((prev) => cb(prev))
    }, [])


    return {
        onChange,
        form,
        setValue,
    }
}

export {
    type SetFormValue
};
export default useForm
