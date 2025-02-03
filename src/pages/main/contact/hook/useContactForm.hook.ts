import { userQuestionSchema, UserQuestionSchema } from "clothing-store-shared/schema"
import { useFormValidation } from "my-hooks"

const shape = userQuestionSchema.insert.shape

const useContactForm = () => {

    const intial: Omit<UserQuestionSchema.Insert, "is_guest" | "user_fk"> = {
        email: "",
        lastname: "",
        message: "",
        name: "",
        phone: ""
    }

    return useFormValidation(intial, {
        validators: {
            email(value) {
                const parse = shape.email.safeParse(value)
                return parse.error?.formErrors.formErrors
            },
            message(value) {
                const parse = shape.message.safeParse(value)
                return parse.error?.formErrors.formErrors
            },
            lastname(value) {
                const parse = shape.lastname.safeParse(value)
                return parse.error?.formErrors.formErrors
            },
            name(value) {
                const parse = shape.name.safeParse(value)
                return parse.error?.formErrors.formErrors
            },
            phone(value) {
                const parse = shape.phone.safeParse(value)
                const format = parse.error?.formErrors.fieldErrors ?? {}
                if ("phone" in format) {
                    return format.phone as Array<string>
                }
            },
        }
    })

}

export default useContactForm