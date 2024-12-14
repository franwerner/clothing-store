import ToggleContent from "@/components/ToggleContent";
import transformToUppercase from "@/utils/transformToUppercase.utils";
import classNames from "classnames";
import { memo, useCallback } from "react";
import { SetURLSearchParams, useSearchParams } from "react-router";
import setSearchParamsFilter from "./helper/setSearchParamsFilter.helper";

interface Color {
    colorID: number,
    quantity: number,
    color: string,
    hexadecimal: string,
}

const colors: Color[] = [
    { colorID: 1, quantity: 5, color: "red", hexadecimal: "#FF0000" },
    { colorID: 2, quantity: 3, color: "blue", hexadecimal: "#0000FF" },
    { colorID: 3, quantity: 8, color: "green", hexadecimal: "#008000" },
    { colorID: 4, quantity: 2, color: "yellow", hexadecimal: "#FFFF00" },
    { colorID: 5, quantity: 7, color: "orange", hexadecimal: "#FFA500" },
    { colorID: 6, quantity: 4, color: "purple", hexadecimal: "#800080" },
    { colorID: 7, quantity: 6, color: "pink", hexadecimal: "#FFC0CB" },
    { colorID: 8, quantity: 1, color: "brown", hexadecimal: "#A52A2A" },
    { colorID: 9, quantity: 9, color: "cyan", hexadecimal: "#00FFFF" },
    { colorID: 10, quantity: 10, color: "magenta", hexadecimal: "#FF00FF" },
]

const ColorItem = memo(({ setSearchParams, color, quantity, hexadecimal, isActive }: Color & { setSearchParams: SetURLSearchParams, isActive?: boolean }) => {

    return (
        <li
            onClick={() => {
                const newURL = setSearchParamsFilter({ isActive, param: "color", value: color })
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

    const [params, fn] = useSearchParams()

    const setSearchParams = useCallback(fn, [])

    const getColor = (params.get("color") || "").split("-")

    return (
        <ToggleContent
            hiddenToggleButton={colors.length <= maxLength}
            as="section"
            id="aside-filter-color">
            <h3 className="font-oswald   text-default-700  uppercase pb-1 font-bold text-[18px]">Color</h3>
            <ToggleContent.visible className={classname}>
                {colors.slice(0, maxLength).map(i => <ColorItem
                    setSearchParams={setSearchParams}
                    isActive={!!getColor.find((e) => i.color == e)}
                    key={i.colorID} {...i} />)}
            </ToggleContent.visible>
            <ToggleContent.hidden className={`overflow-hidden ${classname} `}>
                {colors.slice(maxLength).map(i => <ColorItem
                    setSearchParams={setSearchParams}
                    isActive={!!getColor.find((e) => i.color == e)}
                    key={i.colorID}
                    {...i}
                />)}
            </ToggleContent.hidden>
        </ToggleContent>
    );
};

export default ProductsFilterColor