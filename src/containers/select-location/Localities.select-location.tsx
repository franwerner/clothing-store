import useForm from "@/hooks/useForm.hook"
import { SelectItem } from "@nextui-org/react"
import { useIntersectionObserver } from "@nextui-org/use-intersection-observer"
import { memo } from "react"
import SelectLocationBase from "./Base.select-location"
import useGetLocalities from "./api/useGetLocalities.api"

interface SelectLocationLocalitiesProps {
    province: string
    locality: string
    selectValueHandler: (value:string) =>  void
    errorMessage?: string[] | string
}

const SelectLocationLocalities = memo(({
    locality,
    province,
    selectValueHandler,
    errorMessage
}: SelectLocationLocalitiesProps) => {

    const {form,onChange} = useForm({search : ""})

    const { hasMoreData, isLoading, loadMoreData, localities } = useGetLocalities({
        province: province,
        locality: form.search,
    })
    const [ref] = useIntersectionObserver({
        threshold: 0,
        isEnabled: hasMoreData,
        onChange(isIntersecting) {
            if (isIntersecting) {
                loadMoreData()
            }
        },
        root: null,
    })

    return (
        <SelectLocationBase
            isInvalid={!!errorMessage && !locality}
            errorMessage={errorMessage}
            defaultKey={locality}
            ariaLabel="Selecciona una localidad"
            placeholder="Selecciona una localidad"
            label="localidad"
            isLoading={isLoading}
            onChange={onChange}
            search_value={form.search}
            select={locality} >
            {
                localities.map(({ departamento_nombre, id, nombre }, index) => {
                    return (
                        <SelectItem
                            className="break-all"
                            textValue={nombre}
                            onPress={() => {
                                const isEquals = nombre === locality ? "" : nombre
                                selectValueHandler(isEquals)
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
        </SelectLocationBase>
    )
})

export default SelectLocationLocalities