import useForm from "@/hooks/useForm.hook"
import { UserAddresessSchema } from "clothing-store-shared/schema"

interface DirectionForm {
    street: string
    street_number: string
    apartament?: string
    province: string
    locality: string
    postal_code: string
}

const useDirectionForm = (address: UserAddresessSchema.Base) => {
    const {
        apartament = "",
        locality = "",
        postal_code = "",
        province = "",
        street = "",
        street_number = "",
    } = address

    const { form, onChange, setValue } = useForm<DirectionForm>({
        street: street,
        street_number: street_number,
        apartament: apartament || "",
        province: province,
        locality: locality,
        postal_code: postal_code
    })

    const changes = Object.entries(form).reduce((acc, current) => {
        const [key, value] = current
       
        if (address[key] !== value) {
            acc[key] = value ?? ""
        }
        return acc
    }, {} as DirectionForm)

    return {
        form,
        onChange,
        setValue,
        changes: {
            list: changes,
            isEmpty: Object.keys(changes).length === 0
        }
    }

}

export {
    type DirectionForm
}
export default useDirectionForm