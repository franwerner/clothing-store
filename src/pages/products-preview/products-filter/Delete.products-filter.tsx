import classNames from "classnames"
import { useSearchParams } from "react-router-dom"

const ProductsFilterDelete = () => {

    const [params, setSearchParams] = useSearchParams()
    const color = params.get("color") || ""
    const waits = params.get("waits") || ""
    const price = params.get("price") || ""

    const someFilter = color || waits || price

    return <div
        onClick={() => {
            ["color", "waits", "price"].forEach((i) => (params.delete(i)))
            setSearchParams(params)
        }}
        className={
            classNames(
                "flex items-center gap-x-1 cursor-pointer opacity-100 transition-opacity duration-300",
                {"!opacity-0 " : !someFilter}
            )
        }>
        <span className=" underline text-sm text-default-700 uppercase">Eliminar filtros</span>
        <span
            className="material-symbols-outlined text-default-700 text-xl "
        >filter_alt_off
        </span>
    </div>
}

export default ProductsFilterDelete