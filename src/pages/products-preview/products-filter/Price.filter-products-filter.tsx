import ActionButtonIcon from "@/components/ActionButtonIcon";
import useForm from "@/hooks/useForm.hook";
import router from "@/router";
import { Input } from "@nextui-org/react";
import { memo, useMemo } from "react";

const ProductsFilterPrice = memo(() => {

    const defaultValue = useMemo(() => {
        const price = new URLSearchParams(window.location.search).get("price") || ""
        const [min = 0, max = 0] = price.split("-")
            .map(i => Number(i || 0))
        return {
            "min": Math.min(min, max),
            "max": Math.max(min, max)
        }
    }, [])

    const { form, setValue } = useForm(defaultValue)

    const { max, min } = form

    return (
        <section
            id="aside-filter-price" >
            <h3 className="font-oswald  text-default-700  uppercase pb-1 font-bold text-[18px]">Precio</h3>
            <div className="flex items-center mt-1 gap-2 ">
                <Input
                    onBlur={() => {
                        if (min > max) setValue("max", min + 1)
                    }}
                    onChange={({ target }) => {
                        const minValue = Number(target.value)
                        const verificateMin = Math.max(0, minValue)
                        setValue("min", verificateMin)
                    }}
                    name="min"
                    type="number"
                    value={min.toString()}
                    label="Min"
                    classNames={{
                        inputWrapper: "h-2 bg-default-200 bg-white border border-default-300",
                        label: " text-[13px]",
                        input: "!font-semibold"
                    }}
                    color="default"
                    variant="flat"
                >
                </Input>
                <Input
                    label="Max"
                    onBlur={() => {
                        console.log(max)
                        if (max < min) setValue("min", Math.max(0, max - 1))
                    }}
                    onChange={({ target }) => {
                        const maxValue = Number(target.value)
                        const verificateMax = Math.max(maxValue, 0)
                        setValue("max", verificateMax)
                    }}
                    name="max"
                    type="number"
                    value={max.toString()}
                    classNames={{
                        inputWrapper: "h-2 bg-default-200 bg-white border border-default-300",
                        label: " text-[13px]",
                        input: "!font-semibold"
                    }}
                    color="default"
                    variant="flat"
                >
                </Input>
                <ActionButtonIcon
                    onClick={() => {
                        const SearchParams = new URLSearchParams(window.location.search)
                        SearchParams.set("price", `${min}-${max}`)
                        router.navigate(`${router.state.location.pathname}?${SearchParams}`)
                    }}
                >
                    chevron_right
                </ActionButtonIcon>
            </div>
        </section>
    );
})

export default ProductsFilterPrice