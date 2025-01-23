import { isFunction } from "my-utilities";
import { createContext, HTMLProps } from "react"

type ErrorMessages = Record<string, string[] | undefined | string>

const FormBaseContext = createContext<ErrorMessages>({})

const FormBase = ({ errors, action, ...props }: HTMLProps<HTMLFormElement> & { errors?: ErrorMessages; action?: () => void }) => {
    const currentErrors = errors || {}
    return (
        <FormBaseContext.Provider value={currentErrors}>
            <form
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        isFunction(action) && action()
                    }
                }}
                {...props} />
        </FormBaseContext.Provider>
    )
}

export { FormBaseContext }
export default FormBase