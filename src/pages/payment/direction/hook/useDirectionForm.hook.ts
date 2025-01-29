import { useSelector } from "@/store"
import { userAddressesSchema, userSchema } from "clothing-store-shared/schema"
import { useFormValidation } from "my-hooks"

const initialValues = {
    email: "",
    name: "",
    lastname: "",
    province: "",
    locality: "",
    street: "",
    street_number: "",
    postal_code: "",
    department: "",
    phone: "",
}

const userShape = userSchema.insert.shape
const userAddressShape = userAddressesSchema.insert.shape

const useDirectionForm = () => {

    const props = useSelector(({ userAddress }) => userAddress.address) || {}
    const phone = useSelector(({ user }) => user?.info?.phone) || ""


    return useFormValidation({
        ...initialValues,
        ...props,
        phone
    }, {
        validators: {
            email(v) {
                const parse = userShape.email.safeParse(v)
                return parse.error?.formErrors.formErrors
            },
            name(v) {
                const parse = userShape.name.safeParse(v)
                return parse.error?.formErrors.formErrors
            },
            lastname(v) {
                const parse = userShape.lastname.safeParse(v)
                return parse.error?.formErrors.formErrors
            },
            phone(v) {
                const parse = userShape.phone.refine(i => i, { message: "No es un numero valido.", path: ["phone"] }).safeParse(v)
                const format = parse.error?.formErrors.fieldErrors ?? {}
                if ("phone" in format) {
                    return format.phone as Array<string>
                }
            },
            department(v) {
                const parse = userAddressShape.department.safeParse(v)
                return parse.error?.formErrors.formErrors
            },
            locality(v) {
                const parse = userAddressShape.locality.safeParse(v)
                return parse.error?.formErrors.formErrors
            },
            province(v) {
                const parse = userAddressShape.province.safeParse(v)
                return parse.error?.formErrors.formErrors
            },
            postal_code(v) {
                const parse = userAddressShape.postal_code.safeParse(v)
                return parse.error?.formErrors.formErrors
            },
            street(v) {
                const parse = userAddressShape.street.safeParse(v)
                return parse.error?.formErrors.formErrors
            },
            street_number(v) {
                const parse = userAddressShape.street_number.safeParse(v)
                return parse.error?.formErrors.formErrors
            }
        },
    })
}

type DirectionForm = typeof initialValues
export {
    type DirectionForm
}
export default useDirectionForm