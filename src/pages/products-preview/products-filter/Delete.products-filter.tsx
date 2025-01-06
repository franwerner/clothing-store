import router from "@/router"
import classNames from "classnames"
import { useParams, useSearchParams } from "react-router"

const ProductsFilterDelete = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const {brand,category} = useParams()

    const color = searchParams.get("color") || ""
    const price = searchParams.get("price") || ""
    const size = searchParams.get("size") || ""

    const someFilter = color  || price || size || brand || category

    return <div
        onClick={() => {
            ["color", "price","size"].forEach((i) => (searchParams.delete(i)))
            setSearchParams(searchParams)
            router.navigate("/productos")
        }}
        className={
            classNames(
                "flex items-center gap-x-1 cursor-pointer transition-all duration-200",
                {"!scale-0 h-0" : !someFilter}
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