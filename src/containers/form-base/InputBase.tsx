import { Input, InputProps } from "@nextui-org/react"
import { useContext } from "react"
import { FormBaseContext } from "."
import { isString } from "my-utilities"

const InputErrorMessage = ({ messages }: { messages?: Array<string> | string }) => {
    if (isString(messages)) return <p>{messages}</p>
    return (
        <div>
            {messages && messages.map((i) => <p key={i}>* {i}</p>)}
        </div>
    )
}

const InputBase = ({ name = "", errorMessage, classNames = {},show = true, ...props }: Omit<InputProps, "errorMessage"> & { errorMessage?: string[] | string ,show ?: boolean}) => {
    const errors = useContext(FormBaseContext)
    const errorMessageContext = errorMessage || errors[name]
    if(!show) return
    return (
        <Input
            name={name}
            variant="bordered"
            radius="sm"
            isInvalid={!!errorMessageContext}
            classNames={{
                inputWrapper: "border-1 border-default-400 data-[focus=true]:!border-secondary-400 data-[hover=true]:border-secondary-200",
                ...classNames
            }}
            errorMessage={<InputErrorMessage messages={errorMessageContext} />}
            {...props}
        />
    )
}
export default InputBase