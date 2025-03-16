import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { ProductPreview } from "clothing-store-shared/types"
import { useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"

const useGetProductColorsPreview = () => {

    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const color = searchParams.get("color") || ""

    const queryParams = {
        size: searchParams.get("size") || undefined,
        price: searchParams.get("price") || undefined,
        brand: params.brand,
        category: params.category
    }

    const { isLoading, response, setRequest, clearSideEffects } = useFetchCustom<Array<ProductPreview.Color>>({
        target: "products/view/preview/colors",
        method: "GET",
    })

    useEffect(() => {
        const { brand, category, price, size } = queryParams
        setRequest({
            query: {
                price,
                size,
                brand,
                category,
            },
            onSuccess({ result }) {
                const arr = color.split("-")
                const { data } = result
                const currentColors = arr.filter(i => data.findIndex((e) => e.color_id == i) !== -1)
                searchParams.set("color", currentColors.join("-"))
                setSearchParams(searchParams)
            },
            onFailed() {
                searchParams.set("color", "")
                setSearchParams(searchParams)
            },
        })

        return clearSideEffects

    }, [JSON.stringify(queryParams)])

    const is = response.result ? response.result.data : []
    return {
        isLoading,
        colors: is
    }

}

export default useGetProductColorsPreview