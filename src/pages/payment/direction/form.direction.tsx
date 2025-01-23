import FormBase from "@/containers/form-base"
import InputBase from "@/containers/form-base/InputBase"
import SelectLocationLocalities from "@/containers/select-location/Localities.select-location"
import SelectLocationProvinces from "@/containers/select-location/Provinces.select-location"
import { ReactNode } from "react"
import useDirectionForm from "./hook/useDirectionForm.hook"

const GroupInput = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
    <section className={`grid w-full gap-3 grid-cols-2 ${className}`}>
        {children}
    </section>
)

const DirectionForm = () => {
    const { form, errors, onChange, setForm } = useDirectionForm()
    const { email, department, lastname, locality, name, phone, postal_code, province, street, street_number } = form
    const errors_list = errors.list

    return (
        <FormBase
            className="grid gap-3"
            errors={errors.list}>
            <InputBase
                name="email"
                value={email}
                label="Email"
                onChange={onChange}
                isRequired
            />
            <GroupInput>
                <InputBase
                    name="name"
                    value={name}
                    onChange={onChange}
                    label="Nombre"
                    isRequired
                />
                <InputBase
                    name="lastname"
                    value={lastname}
                    onChange={onChange}
                    label="Apellido"
                    isRequired
                />
            </GroupInput>
            <GroupInput className="max-sm:grid-cols-1">
                <SelectLocationProvinces
                    province={province}
                    errorMessage={errors_list.province}
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
                    errorMessage={errors_list.locality}
                    selectValueHandler={(value) => {
                        setForm({ locality: value })
                    }}
                />
            </GroupInput>
            <GroupInput className="grid-cols-[1fr,auto]">
                <InputBase
                    name="street"
                    value={street}
                    onChange={onChange}
                    label="Calle"
                    isRequired
                />
                <InputBase
                    className="max-w-[100px]"
                    name="street_number"
                    value={street_number}
                    onChange={onChange}
                    label="Numero"
                />
            </GroupInput>
            <GroupInput>
                <InputBase
                    name="department"
                    value={department}
                    onChange={onChange}
                    label="Departamento"
                />
                <InputBase
                maxLength={4}
                    name="postal_code"
                    value={postal_code}
                    onChange={onChange}
                    label="Codigo postal"
                    isRequired
                />
            </GroupInput>
            <InputBase
                name="phone"
                value={phone}
                onChange={onChange}
                label="Telefono"
                isRequired
            />
        </FormBase>
    )
}

export default DirectionForm