import classNames from "classnames"
import { FC, memo, useCallback } from "react"
import { SetURLSearchParams, useSearchParams } from "react-router"
import setSearchParamsFilter from "./helper/setSearchParamsFilter.helper"
import useProductSizesPreview from "./api/useProductSizesPreview.api"
import { ProductPreview } from "clothing-store-shared/types"
import ToggleContent from "./components/ToggleContent"

const SizeItem: FC<ProductPreview.Size & { setSearchParams: SetURLSearchParams, isActive?: boolean }> = memo(({ quantity, size, setSearchParams, isActive, size_id }) => {
  return (
    <li
      onClick={() => {
        const newParams = setSearchParamsFilter({ isActive, param: "size", value: size_id })
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

  const { sizes, isLoading } = useProductSizesPreview()

  const [params, fn] = useSearchParams()

  const setSearchParams = useCallback(fn, [])

  const getWaits = (params.get("size") || "").split("-")

  return (
    <ToggleContent
      id="aside-filter-size"
      className=" flex flex-col items-start  "
      hiddenToggleButton={sizes.length <= maxLength}
    >
      <h3 className={classNames(
        "font-oswald  text-default-700 bg-tra uppercase pb-1  font-bold text-[18px]",
        {
          "animate-pulse": isLoading
        }
      )}>
        Talles
      </h3>
      <ToggleContent.visible className={` ${classname}`}>
        {sizes.slice(0, maxLength).map(e => <SizeItem
          key={e.size_id}
          isActive={!!getWaits.find(i => i == e.size_id)}
          setSearchParams={setSearchParams}  {...e} />
        )}
      </ToggleContent.visible>
      <ToggleContent.hidden className={` overflow-hidden ${classname}`}>
        {sizes.slice(maxLength).map(e => <SizeItem
          isActive={!!getWaits.find(i => i == e.size_id)}
          setSearchParams={setSearchParams}
          key={e.size_id}
          {...e} />)}
      </ToggleContent.hidden>
    </ToggleContent>
  )
}




export default ProductsFilterSizes