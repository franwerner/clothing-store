import { userSchema } from "clothing-store-shared/schema"
import { useFormValidation } from "my-hooks"

interface RegisterForm {
    fullname: string
    email: string
    phone: string
    password: string
    confirm_password: string
}

const shape = userSchema.insert.shape

const initalValues: RegisterForm = {
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
}

const useRegisterForm = () => {
    const { form, errors, onChange, handlerValidationForm } = useFormValidation(initalValues, {
        validators: {
            confirm_password(value, state) {
                if (state.password.trim() !== value.trim()) return ["Las contraseñas deben ser iguales"]
            },
            password(value) {
                const parse = shape.password.safeParse(value)
                return parse.error?.formErrors.formErrors
            },
            email(value) {
                const parse = shape.email.safeParse(value)
                return parse.error?.formErrors.formErrors
            },
            fullname(value) {
                const parse = shape.fullname.safeParse(value)
                return parse.error?.formErrors.formErrors
            },
            phone(value) {
                const parse = shape.phone.safeParse(value)
                const format = parse.error?.formErrors.fieldErrors ?? {}
                if ("phone" in format) {
                    return format.phone as Array<string>
                }
            },
        },
        triggerValidation: {
            password: ["confirm_password"],
        }
    })

    return {
        form,
        onChange,
        errors: errors,
        handlerValidationForm
    }

}

export type { RegisterForm }
export default useRegisterForm