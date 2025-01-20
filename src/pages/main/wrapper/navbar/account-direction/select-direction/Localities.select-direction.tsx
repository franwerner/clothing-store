import { ChangeEventHandler, memo } from "react"
import SelectDirectionBase from "./Base.select-direction"
import useGetLocalities from "./api/useGetLocalities.api"
import { useIntersectionObserver } from "@nextui-org/use-intersection-observer"
import { SelectItem } from "@nextui-org/react"
import { SelectValueHandler } from "."

interface SelectDirectionLocalitiesProps {
    hasError: boolean
    onChange: ChangeEventHandler<HTMLInputElement>
    province: string
    locality: string
    locality_search: string
    selectValueHandler: SelectValueHandler
}

const SelectDirectionLocalities = memo(({
    hasError,
    locality,
    onChange,
    province,
    selectValueHandler,
    locality_search,
}: SelectDirectionLocalitiesProps) => {

    const { hasMoreData, isLoading, loadMoreData, localities } = useGetLocalities({
        province: province,
        locality: locality_search,
    })

    const [ref] = useIntersectionObserver({
        threshold: 0,
        isEnabled: hasMoreData,
        onChange(isIntersecting) {
            if (isIntersecting) {
                loadMoreData()
            }
        },
        root: null
    })

    return (
        <SelectDirectionBase
            isInvalid={hasError}
            defaultKey={locality}
            ariaLabel="Selecciona una localidad"
            placeholder="Selecciona una localidad"
            label = "localidad"
            name={"locality"}
            isLoading={isLoading}
            onChange={onChange}
            value={locality_search}
            select={locality} >
            {
                localities.map(({ departamento_nombre, id, nombre }, index) => {
                    return (
                        <SelectItem
                            className="break-all"
                            textValue={nombre}
                            onPress={() => {
                                selectValueHandler("locality", nombre)
                            }}
                            key={id}>
                            {nombre}
                            <span
                                className="ms-1 font-medium text-[15px]"
                                ref={index == localities.length - 1 ? ref : null}>
                                {`(${departamento_nombre})`}
                            </span>
                        </SelectItem>
                    )
                })
            }
        </SelectDirectionBase>
    )
})

export default SelectDirectionLocalities