import useForm from "@/hooks/useForm.hook"
import { SelectItem } from "@nextui-org/react"
import { memo } from "react"
import useGetProvinces from "./api/useGetProvinces.api"
import SelectLocationBase from "./Base.select-location"

interface SelectLocationProvincesProps {
    province: string
    selectValueHandler: (value: string) => void
    errorMessage?: string[] | string
}

const SelectLocationProvinces = memo(({
    province,
    selectValueHandler,
    errorMessage

}: SelectLocationProvincesProps) => {

    const { form, onChange } = useForm({ search: "" })
    const { isLoading, provinces } = useGetProvinces(form.search)

    return (
        <SelectLocationBase
            defaultKey={province}
            isInvalid={!!errorMessage && !province}
            label="provincia"
            ariaLabel="Selecciona una provincia"
            placeholder="Selecciona una provincia"
            isLoading={isLoading}
            onChange={onChange}
            search_value={form.search}
            select={province}
            errorMessage={errorMessage}
        >
            {
                provinces.map(({ id, nombre }) => (
                    <SelectItem
                        textValue={nombre}
                        onPress={() => {
                            const isEquals = nombre === province ? "" : nombre
                            selectValueHandler(isEquals)
                        }}
                        key={id}>
                        {nombre}
                    </SelectItem>
                ))
            }
        </SelectLocationBase>
    )
})

export default SelectLocationProvinces