import ToggleContent from "@/components/ToggleContent"
import classNames from "classnames"
import { FC, memo, useCallback } from "react"
import { SetURLSearchParams, useSearchParams } from "react-router-dom"
import setSearchParamsFilter from "./helper/setSearchParamsFilter.helper"

interface WaitsItem {
  waistID: number,
  size: number | string,
  quantity: number
}

const waits: Array<WaitsItem> = [
  { quantity: 64, waistID: 1, size: 10 },
  { quantity: 41, waistID: 2, size: 99 },
  { quantity: 101, waistID: 3, size: 68 },
  { quantity: 7, waistID: 4, size: 90 },
  { quantity: 61, waistID: 5, size: 63 },
  { quantity: 9, waistID: 6, size: 73 },
  { quantity: 10, waistID: 7, size: 67 },
  { quantity: 47, waistID: 8, size: 49 },
  { quantity: 24, waistID: 9, size: 34 },
  { quantity: 23, waistID: 10, size: 33 },
]

const WaitsItem: FC<WaitsItem & { setSearchParams: SetURLSearchParams, isActive?: boolean }> = memo(({ quantity, size, setSearchParams, isActive }) => {
  return (
    <li
      onClick={() => {
        const newParams = setSearchParamsFilter({ isActive, param: "waits", value: size })
        setSearchParams(newParams)
      }}
      className={classNames(
        "overflow-hidden bg-white cursor-pointer  hover:border-default-700 mb-1 mx-1 text-ellipsis text-[14px]  rounded-md border-1  w-[48px] max-w[48px] border-b-4 text-center  py-1",
        { "border-default-700 scale-90": isActive }
      )}>
      {size.toString()}
      <span className="text-[10px]">{`(${quantity})`}</span>
    </li>
  )
})

const ProductsFilterWaits = () => {

  const maxLength = 6
  const classname = `inline-flex flex-wrap md:grid md:grid-cols-2 `

  const [params, fn] = useSearchParams()

  const setSearchParams = useCallback(fn, [])

  const getWaits = (params.get("waits") || "").split("-")

  return (
    <ToggleContent
      id="aside-filter-waits"
      as="section"
      className=" flex flex-col items-start  "
      hiddenToggleButton={waits.length <= maxLength}
    >
      <h3 className="font-oswald  text-default-700 bg-tra uppercase pb-1  font-bold text-[18px]">Talles</h3>
      <ToggleContent.visible className={` ${classname}`}>
        {waits.slice(0, maxLength).map(e => <WaitsItem
          key={e.waistID}
          isActive={!!getWaits.find(i => i == e.size)}
          setSearchParams={setSearchParams}  {...e} />
        )}
      </ToggleContent.visible>
      <ToggleContent.hidden className={` overflow-hidden ${classname}`}>
        {waits.slice(maxLength).map(e => <WaitsItem
          isActive={!!getWaits.find(i => i == e.size)}
          setSearchParams={setSearchParams}
          key={e.waistID}
          {...e} />)}
      </ToggleContent.hidden>
    </ToggleContent>
  )
}




export default ProductsFilterWaits