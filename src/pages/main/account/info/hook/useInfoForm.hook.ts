import removePropertiesByValues from "@/utils/removePropertiesByValues.utilts"
import { userSchema } from "clothing-store-shared/schema"
import { useFormValidation } from "my-hooks"

export interface InfoFormProps {
    name: string,
    lastname : string
    phone: string,
    password: string
}

const shape = userSchema.update.shape

const initalValues: InfoFormProps = {
    name: "",
    lastname : "",
    phone: "",
    password: "",
}

const useInfoForm = (props: InfoFormProps = initalValues) => {

    const {form, onChange, errors, setForm} = useFormValidation<InfoFormProps>(props, {
        validators: {
            name(value) {
                if(value.length === 0) return
                const parse = shape.name.safeParse(value)
                return parse.error?.formErrors.formErrors
            },
            lastname(value) {
                if(value.length === 0) return
                const parse = shape.lastname.safeParse(value)
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

    const body = removePropertiesByValues({
        name: form.name,
        lastname: form.lastname,
        password: form.password,
        phone: form.phone
    }, [props.lastname, props.name, props.phone, "", undefined])

    return {
        form,
        onChange,
        errors,
        setForm,
        changes : {
            list : body,
            hasChanges : Object.keys(body).length > 0
        },
    }

}
export default useInfoForm