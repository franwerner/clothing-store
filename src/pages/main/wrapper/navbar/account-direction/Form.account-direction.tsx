import FormBase from "@/containers/form-base"
import InputBase from "@/containers/form-base/InputBase"
import { SetValidationForm } from "my-hooks"
import { ChangeEventHandler } from "react"
import { DirectionForm } from "./Modal.account-direction"
import SelectLocationProvinces from "@/containers/select-location/Provinces.select-location"
import SelectLocationLocalities from "@/containers/select-location/Localities.select-location"
interface AccountDirectionFormProps {
    errors: Partial<Record<keyof DirectionForm, string[]>>
    form: DirectionForm
    onChange: ChangeEventHandler,
    setForm: SetValidationForm<DirectionForm>
}

const AccountDirectionForm = ({ errors, form, onChange, setForm }: AccountDirectionFormProps) => {

    const { street, street_number, department, postal_code, locality, province } = form

    return (
        <FormBase
            errors={errors}
            className="grid sm:grid-cols-2 gap-3">
            <SelectLocationProvinces
                province={province}
                errorMessage={errors.province}
                selectValueHandler={(value) => {
                    setForm({
                        province: value,
                        locality: ""
                    })
                }}
            />
            <SelectLocationLocalities
                locality={locality}
                province={province}
                selectValueHandler={(v) => setForm({ locality: v })}
                errorMessage={errors.locality}
            />
            <InputBase
                isRequired
                name="street"
                label="Calle"
                value={street}
                onChange={onChange}
            />
            <InputBase
                name="street_number"
                value={street_number}
                label="Altura"
                onChange={onChange}
            />

            <InputBase
                isRequired
                name="postal_code"
                value={postal_code}
                maxLength={4}
                label="Codigo postal"
                onChange={onChange}
            />
            <InputBase
                name="department"
                value={department}
                label="Departamento"
                onChange={onChange}
            />
        </FormBase>
    )
}

export default AccountDirectionForm