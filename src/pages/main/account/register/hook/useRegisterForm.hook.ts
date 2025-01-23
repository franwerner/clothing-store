import { userSchema } from "clothing-store-shared/schema"
import { useFormValidation } from "my-hooks"

const shape = userSchema.insert.shape
const initalValues = {
    name: "",
    lastname: "",
    email: "",
    confirm_email: "",
    phone: "",
    password: "",
    confirm_password: "",
}

const useRegisterForm = () => {
    return useFormValidation(initalValues, {
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
            confirm_email(value, state) {
                if (state.email.trim() !== value.trim()) return ["Los email deben ser iguales"]
            },
            name(value) {
                const parse = shape.name.safeParse(value)
                return parse.error?.formErrors.formErrors
            },
            lastname(value) {
                const parse = shape.lastname.safeParse(value)
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
            confirm_password: ["name"],
            email: ["confirm_email"]
        }
    })

}
type RegisterForm = typeof initalValues
export type { RegisterForm }
export default useRegisterForm