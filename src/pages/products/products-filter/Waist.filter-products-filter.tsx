import ToggleContent from "@/components/ToggleContent"
import { FC } from "react"

interface WaitsItem {
  id: number,
  wait: number | string,
  count: number
}

const waits: Array<WaitsItem> = [
  { count: 64, id: 1, wait: 10 },
  { count: 41, id: 2, wait: 99 },
  { count: 101, id: 3, wait: 68 },
  { count: 7, id: 4, wait: 90 },
  { count: 61, id: 5, wait: 63 },
  { count: 9, id: 6, wait: 73 },
  { count: 10, id: 7, wait: 67 },
  { count: 47, id: 8, wait: 49 },
  { count: 24, id: 9, wait: 34 },
  { count: 23, id: 10, wait: 33 },
]

const WaitsItem: FC<WaitsItem> = ({ count, wait, }) => {
  return (
    <li className="overflow-hidden cursor-pointer  hover:border-default-700 mb-1 mx-1 text-ellipsis text-[14px]  rounded-md border-1  w-[48px] max-w[48px] border-b-4 text-center  py-1">
      {wait.toString()}
      <span className="text-[10px]">{`(${count})`}</span>
    </li>
  )
}

const ProductsFilterWaits = () => {

  const maxLength = 6
  const classname = `inline-flex flex-wrap md:grid md:grid-cols-2 `
  return (
    <ToggleContent
      id="aside-filter-waits"
      as="section"
      className=" flex flex-col items-start  "
      hiddenToggleButton={waits.length <= maxLength}
    >
      <h3 className="font-oswald  text-default-700 tracking-wide uppercase pb-1  font-bold text-[18px]">Talles</h3>
      <ToggleContent.visible className={` ${classname}`}>
        {waits.slice(0, maxLength).map(e => <WaitsItem key={e.id} {...e} />)}
      </ToggleContent.visible>
      <ToggleContent.hidden className={` overflow-hidden ${classname}`}>
        {waits.slice(maxLength).map(e => <WaitsItem key={e.id} {...e} />)}
      </ToggleContent.hidden>
    </ToggleContent>
  )
}




export default ProductsFilterWaits