import ToggleContent from "@/components/ToggleContent";
import transformToUppercase from "@/utils/transformToUppercase.utils";
import classNames from "classnames";
import { ProductColorPreview } from "clothing-store-shared/types";
import { memo, useCallback } from "react";
import { SetURLSearchParams, useSearchParams } from "react-router";
import { useProductPreviewContext } from "..";
import setSearchParamsFilter from "./helper/setSearchParamsFilter.helper";


const ColorItem = memo(({ setSearchParams, color, quantity, hexadecimal, isActive, color_id }: ProductColorPreview & { setSearchParams: SetURLSearchParams, isActive?: boolean }) => {

    return (
        <li
            onClick={() => {
                const newURL = setSearchParamsFilter({ isActive, param: "color", value: color_id })
                setSearchParams(newURL)
            }}
            className={classNames(
                "border-1 bg-white border-b-3 border-default-200 rounded-md mb-1 mx-1 hover:border-default-700 gap-1 cursor-pointer py-[6px] text-[14px] flex items-center justify-between p-1 w-min max-w-[180px]",
                { "border-default-700 scale-90": isActive }
            )}>
            <div
                className="rounded-full overflow-hidden flex  h-[16px]"
                style={{
                    border: `1px solid ${hexadecimal}`
                }}>
                <span style={{ backgroundColor: hexadecimal, opacity: 0.5 }} className="h-full px-[7px] w-full">
                </span>
            </div>
            <span className="text-ellipsis flex-1 overflow-hidden">{transformToUppercase(color)}</span>
            <span className="text-[10px]">{`(${quantity})`}</span>
        </li >
    )
})

const ProductsFilterColor = () => {

    const maxLength = 6

    const classname = `inline-flex flex-wrap md:block`

    const { colors, isLoading } = useProductPreviewContext()

    const [params, fn] = useSearchParams()

    const setSearchParams = useCallback(fn, [])

    const getColor = (params.get("color") || "").split("-")

    return (
        <ToggleContent
            hiddenToggleButton={colors.length <= maxLength}
            as="section"
            id="aside-filter-color">
            <h3 className={classNames(
                "font-oswald   text-default-700 bg-tra uppercase pb-1  font-bold text-[18px]",
                {
                    "animate-pulse": isLoading
                }
            )}>Colores</h3>
            <ToggleContent.visible className={classname}>
                {colors.slice(0, maxLength).map(i => <ColorItem
                    setSearchParams={setSearchParams}
                    isActive={!!getColor.find((e) => i.color_id == e)}
                    key={i.color_id} {...i} />)}
            </ToggleContent.visible>
            <ToggleContent.hidden className={`overflow-hidden ${classname} `}>
                {colors.slice(maxLength).map(i => <ColorItem
                    setSearchParams={setSearchParams}
                    isActive={!!getColor.find((e) => i.color_id == e)}
                    key={i.color_id}
                    {...i}
                />)}
            </ToggleContent.hidden>
        </ToggleContent>
    )
}

export default ProductsFilterColor