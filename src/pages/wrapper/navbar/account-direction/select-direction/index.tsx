import useForm, { SetFormValue } from "@/hooks/useForm.hook"
import { memo, useCallback } from "react"
import { DirectionForm } from "../Modal.account-direction"
import SelectDirectionLocalities from "./Localities.select-direction"
import SelectDirectionProvinces from "./Provinces.select-direction"

type SelectNames = "province" | "locality"
type SelectValueHandler = (name: SelectNames, value: string) => void

interface SelectedProps {
    setValue: SetFormValue<DirectionForm>
    province: string
    locality: string
    province_error: any
    locality_error: any
}

const DirectionFormSelectItems = memo(({
    setValue,
    province,
    locality,
    locality_error,
    province_error,
}: SelectedProps) => {

    const { form, onChange } = useForm({ province: "", locality: "" })

    const selectValueHandler: SelectValueHandler = useCallback((name, value) => {
        setValue(
            (currentState) => {
                const isEquals = currentState[name] == value ? "" : value
                const isProvince = name === "province"
                return {
                    ...currentState,
                    province: isProvince ? isEquals : currentState["province"],
                    locality: isProvince ? "" : isEquals
                }
            }
        )
    }, [])

    return (
        <section className="grid xs:grid-cols-2 gap-3">
            <SelectDirectionProvinces
                hasError={province_error && !province}
                province_search={form.province}
                onChange={onChange}
                province={province}
                selectValueHandler={selectValueHandler}
            />
            <SelectDirectionLocalities
                hasError={locality_error && !locality}
                province={province}
                locality={locality}
                locality_search={form.locality}
                onChange={onChange}
                selectValueHandler={selectValueHandler}
            />

        </section>
    )
})
export type {
    SelectValueHandler
}
export default DirectionFormSelectItems