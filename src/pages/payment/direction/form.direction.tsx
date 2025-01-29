import FormBase from "@/containers/form-base"
import InputBase from "@/containers/form-base/InputBase"
import SelectLocationLocalities from "@/containers/select-location/Localities.select-location"
import SelectLocationProvinces from "@/containers/select-location/Provinces.select-location"
import { ReactNode } from "react"
import { usePaymentContext } from "../provider/Payment.provider"

const GroupInput = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
    <section className={`grid w-full gap-3 grid-cols-2 ${className}`}>
        {children}
    </section>
)

const DirectionForm = () => {
    const {errors,form,isGuest,onChange,setForm} = usePaymentContext()
    const errors_list = errors.list
    const {department,email,lastname,locality,name,phone,postal_code,province,street,street_number} = form
    return (
        <FormBase
            className="grid gap-3"
            errors={errors_list}>
            <InputBase
                show={isGuest}
                name="email"
                value={email}
                label="Email"
                onChange={onChange}
                isRequired
            />
            <GroupInput>
                <InputBase
                    show={isGuest}
                    name="name"
                    value={name}
                    onChange={onChange}
                    label="Nombre"
                    isRequired
                />
                <InputBase
                    show={isGuest}
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