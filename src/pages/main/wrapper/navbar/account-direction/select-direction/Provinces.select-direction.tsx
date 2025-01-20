import { SelectItem } from "@nextui-org/react"
import { ChangeEventHandler, memo } from "react"
import { SelectValueHandler } from "."
import useGetProvinces from "./api/useGetProvinces.api"
import SelectDirectionBase from "./Base.select-direction"

interface SelectDirectionProvincesProps {
    hasError: boolean
    onChange: ChangeEventHandler<HTMLInputElement>
    province: string
    province_search: string
    selectValueHandler: SelectValueHandler
}

const SelectDirectionProvinces = memo(({
    hasError,
    onChange,
    province,
    selectValueHandler,
    province_search,

}: SelectDirectionProvincesProps) => {

    const { isLoading, provinces } = useGetProvinces(province_search)

    return (
        <SelectDirectionBase
            defaultKey={province}
            isInvalid={hasError}
            label = "provincia"
            ariaLabel="Selecciona una provincia"
            placeholder="Selecciona una provincia"
            name={"province"}
            isLoading={isLoading}
            onChange={onChange}
            value={province_search}
            select={province}
        >
            {
                provinces.map(({ id, nombre }) => (
                    <SelectItem
                        textValue={nombre}
                        onPress={() => {
                            selectValueHandler("province", nombre)
                        }}
                        key={id}>
                        {nombre}
                    </SelectItem>
                ))
            }
        </SelectDirectionBase>
    )
})

export default SelectDirectionProvinces