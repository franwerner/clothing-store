import { userAddresessSchema, UserAddresessSchema } from "clothing-store-shared/schema"
import { useFormValidation } from "my-hooks"

interface DirectionForm {
    street: string
    street_number: string
    department?: string
    province: string
    locality: string
    postal_code: string
}

const shape = userAddresessSchema.base.shape

const useDirectionForm = (address: UserAddresessSchema.Base) => {

    const user_address_id = address.user_address_id
    const {
        department,
        locality = "",
        postal_code = "",
        province = "",
        street = "",
        street_number,
    } = address

    const { form, onChange, setForm, errors, handlerValidationForm } = useFormValidation<DirectionForm>({
        street: street,
        street_number: street_number || "",
        department: department || "",
        province: province,
        locality: locality,
        postal_code: postal_code
    }, {
        validators: {
            locality(value) {
                const parse = shape.locality.safeParse(value)
                return parse.error?.formErrors.formErrors
            },
            postal_code(value) {
                const parse = shape.postal_code.safeParse(value)
                return parse.error?.formErrors.formErrors
            },
            province(value) {
                const parse = shape.province.safeParse(value)
                return parse.error?.formErrors.formErrors
            },
            street(value) {
                const parse = shape.street.safeParse(value)
                return parse.error?.formErrors.formErrors
            },
            street_number(value) {
                const parse = shape.street_number.safeParse(value)
                return parse.error?.formErrors.formErrors
            },
        },
        triggerValidation: {
            province: ["locality"]
        }
    })

    const changes = user_address_id ? Object.entries(form).reduce((acc, current) => {
        const [key, value] = current
        if (address[key] !== value?.trim()) {
            acc[key] = value ?? ""
        }
        return acc
    }, {} as DirectionForm) : {}

    return {
        form,
        onChange,
        setForm,
        changes: {
            list: changes,
            notChanges: !!user_address_id && Object.keys(changes).length === 0
        },
        errors,
        handlerValidationForm
    }

}

export {
    type DirectionForm
}
export default useDirectionForm