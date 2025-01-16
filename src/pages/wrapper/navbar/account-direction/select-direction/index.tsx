import useForm from "@/hooks/useForm.hook"
import { SetValidationForm } from "my-hooks"
import { memo } from "react"
import { DirectionForm } from "../Modal.account-direction"
import SelectDirectionLocalities from "./Localities.select-direction"
import SelectDirectionProvinces from "./Provinces.select-direction"

type SelectNames = "province" | "locality"
type SelectValueHandler = (name: SelectNames, value: string) => void

interface SelectedProps {
    setForm: SetValidationForm<DirectionForm>
    province: string
    locality: string
    province_error: any
    locality_error: any
}

const DirectionFormSelectItems = memo(({
    setForm,
    province,
    locality,
    locality_error,
    province_error,
}: SelectedProps) => {

    const { form, onChange } = useForm({ province: "", locality: "" })

    const selectProvince: SelectValueHandler = (key, value) => {
        const isEquals = value === province
        setForm(key, isEquals ? "" : value).setError()
        setForm("locality", "").setError()
    }

    const selectLocality: SelectValueHandler = (key, value) => {
        const isEquals = value === locality
        setForm(key, isEquals ? "" : value).setError()
    }

    return (
        <section className="grid xs:grid-cols-2 gap-3">
            <SelectDirectionProvinces
                hasError={province_error && !province}
                province_search={form.province}
                onChange={onChange}
                province={province}
                selectValueHandler={selectProvince}
            />
            <SelectDirectionLocalities
                hasError={locality_error && !locality}
                province={province}
                locality={locality}
                locality_search={form.locality}
                onChange={onChange}
                selectValueHandler={selectLocality}
            />

        </section>
    )
})
export type {
    SelectValueHandler
}
export default DirectionFormSelectItems