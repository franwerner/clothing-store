import useForm from "@/hooks/useForm.hook";
import { Button, Input } from "@nextui-org/react";
import { memo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import classNames from "classnames";

const ProductsFilterPrice = memo(() => {

    const [searchParams, fn] = useSearchParams()

    const price = searchParams.get("price")

    const [defaultMin, defaultMax] = price ? price.split("-") : []

    const verificateDefaultMax = Number(defaultMin) > Number(defaultMax) ? 0 : defaultMax

    useEffect(() => {
        if (price === null) {
            setValue("min", 0)
            setValue("max", 0)
        }
    }, [price === null])

    const { form, setValue, onChange } = useForm({
        min: defaultMin,
        max: verificateDefaultMax
    })

    const { max: _max, min: _min } = form

    const max = Number(_max)
    const min = Number(_min)


    return (
        <section
            id="aside-filter-price" >
            <h3 className={classNames(
                "font-oswald text-default-700 uppercase pb-1 font-bold text-[18px]"
            )}>
                Precio
            </h3>
            <div className="flex items-center mt-1 gap-2 ">
                <Input
                    onChange={onChange}
                    name="min"
                    type="number"
                    value={min < 0 ? "0" : min.toString()}
                    label="Min"
                    classNames={{
                        inputWrapper: "h-2 bg-default-200 bg-white border border-default-300",
                        label: "text-[13px]",
                        input: "!font-semibold"
                    }}
                    color="default"
                    variant="flat"
                >
                </Input>
                <Input
                    label="Max"
                    onChange={onChange}
                    name="max"
                    type="number"
                    value={max < 0 ? "0" : max.toString()}
                    classNames={{
                        inputWrapper: "h-2 bg-default-200 bg-white border border-default-300",
                        label: " text-[13px]",
                        input: "!font-semibold"
                    }}
                    color="default"
                    variant="flat"
                >
                </Input>
                <Button
                    isIconOnly
                    className="material-symbols-outlined text-md bg-default-800 text-white "
                    onPress={() => {
                        const r = [Math.abs(min), Math.abs(max)]
                        if (min == 0 && max == 0) {
                            searchParams.delete("price")
                        }
                        else if (min > max) {
                            searchParams.set("price", min.toString())
                            setValue("max", 0)
                        } else {
                            searchParams.set("price", r.join("-"))
                        }
                        fn(searchParams)
                    }}
                >
                    chevron_right
                </Button>
            </div>
        </section>
    );
})

export default ProductsFilterPrice