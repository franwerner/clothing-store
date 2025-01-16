import { userSchema } from "clothing-store-shared/schema"
import { useFormValidation } from "my-hooks"

interface PasswordResetFormProps {
    password: string
    confirm_password: string
}

const passwordSchema = userSchema.base.shape.password

const usePasswordResetForm = () => {

    const initialValue: PasswordResetFormProps = {
        password: "",
        confirm_password: ""
    }

    return useFormValidation(initialValue, {
        validators: {
            confirm_password(value, form) {
                if (value.trim() !== form.password.trim()) {
                    return ["Las contraseñas deben ser iguales"]
                }
            },
            password(value) {
                const parse = passwordSchema.safeParse(value)
                return parse.error?.formErrors.formErrors
            },
        },
        triggerValidation: {
            password: ["confirm_password"]
        }
    })

}

export default usePasswordResetForm