import ToggleContent from "@/components/ToggleContent"
import classNames from "classnames"
import { FC, memo, useCallback } from "react"
import { SetURLSearchParams, useSearchParams } from "react-router-dom"
import setSearchParamsFilter from "./helper/setSearchParamsFilter.helper"

interface SizeItem {
  product_size_id: number,
  size: number | string,
  quantity: number
}

const sizes: Array<SizeItem> = [
  { quantity: 64, product_size_id: 1, size: 10 },
  { quantity: 41, product_size_id: 2, size: 99 },
  { quantity: 101, product_size_id: 3, size: 68 },
  { quantity: 7, product_size_id: 4, size: 90 },
  { quantity: 61, product_size_id: 5, size: 63 },
  { quantity: 9, product_size_id: 6, size: 73 },
  { quantity: 10, product_size_id: 7, size: 67 },
  { quantity: 47, product_size_id: 8, size: 49 },
  { quantity: 24, product_size_id: 9, size: 34 },
  { quantity: 23, product_size_id: 10, size: 33 },
]

const SizeItem: FC<SizeItem & { setSearchParams: SetURLSearchParams, isActive?: boolean }> = memo(({ quantity, size, setSearchParams, isActive }) => {
  return (
    <li
      onClick={() => {
        const newParams = setSearchParamsFilter({ isActive, param: "size", value: size })
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

const ProductsFilterSizes = () => {

  const maxLength = 6
  const classname = `inline-flex flex-wrap md:grid md:grid-cols-2 `

  const [params, fn] = useSearchParams()

  const setSearchParams = useCallback(fn, [])

  const getWaits = (params.get("size") || "").split("-")

  return (
    <ToggleContent
      id="aside-filter-size"
      as="section"
      className=" flex flex-col items-start  "
      hiddenToggleButton={sizes.length <= maxLength}
    >
      <h3 className="font-oswald  text-default-700 bg-tra uppercase pb-1  font-bold text-[18px]">Talles</h3>
      <ToggleContent.visible className={` ${classname}`}>
        {sizes.slice(0, maxLength).map(e => <SizeItem
          key={e.product_size_id}
          isActive={!!getWaits.find(i => i == e.size)}
          setSearchParams={setSearchParams}  {...e} />
        )}
      </ToggleContent.visible>
      <ToggleContent.hidden className={` overflow-hidden ${classname}`}>
        {sizes.slice(maxLength).map(e => <SizeItem
          isActive={!!getWaits.find(i => i == e.size)}
          setSearchParams={setSearchParams}
          key={e.product_size_id}
          {...e} />)}
      </ToggleContent.hidden>
    </ToggleContent>
  )
}




export default ProductsFilterSizes