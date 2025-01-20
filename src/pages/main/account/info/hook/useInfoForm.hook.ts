import { userSchema } from "clothing-store-shared/schema"
import { useFormValidation } from "my-hooks"

export interface InfoFormProps {
    fullname: string,
    phone: string,
    password: string
}

const shape = userSchema.update.shape

const initalValues: InfoFormProps = {
    fullname: "",
    phone: "",
    password: "",
}

const useInfoForm = (props: InfoFormProps = initalValues) => {


    return useFormValidation<InfoFormProps>(props, {
        validators: {
            fullname(value) {
                if(value.length === 0) return
                const parse = shape.fullname.safeParse(value)
                return parse.error?.formErrors.formErrors
            },
            password(value) {
                if(value.length === 0) return
                const parse = shape.password.safeParse(value)
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
export default useInfoForm