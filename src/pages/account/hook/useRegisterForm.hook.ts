import zodPickMessage from "@/utils/zodPickMessage.utilts"
import { userSchema } from "clothing-store-shared/schema"
import { HandlerValidatorForm, useFormValidation } from "my-hooks"
interface RegisterFormProps {
    fullname: string
    email: string
    phone: string
    password: string
    confirm_password: string
}

const shape = userSchema.insert.shape

const useRegisterForm = () => {


    const initalValues: RegisterFormProps = {
        fullname: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
    }

    const validator: HandlerValidatorForm<RegisterFormProps> = ({ fieldName, value, currentState }) => {
        if (fieldName in shape) {
            return zodPickMessage(shape[fieldName as keyof typeof shape].safeParse(value).error)
        } else if (fieldName === "confirm_password") {
            if (value !== currentState.password.value) {
                return "La contraseña no son iguales."
            }
        }
    }

    return useFormValidation<RegisterFormProps>(initalValues, validator)

}

export { type RegisterFormProps }
export default useRegisterForm