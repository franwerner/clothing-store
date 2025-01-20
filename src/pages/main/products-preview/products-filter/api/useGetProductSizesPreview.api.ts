import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { ProductPreview } from "clothing-store-shared/types"
import { useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"

const useGetProductSizesPreview = () => {

    const params = useParams()
    const [searchParams] = useSearchParams()

    const queryParams = {
        color: searchParams.get("color") || undefined,
        price: searchParams.get("price") || undefined,
        brand: params.brand,
        category: params.category
    }

    const { isLoading, response, setRequest, clearSideEffects } = useFetchCustom<Array<ProductPreview.Size>>({
        target: "products/view/preview/sizes",
        method: "GET"
    })

    useEffect(() => {
        const { brand, category, price, color } = queryParams
        setRequest({
            query: {
                price,
                color,
                brand,
                category
            }
        })
        return clearSideEffects
    }, [JSON.stringify(queryParams)])

    const is = response.result ? response.result.data : []

    return {
        isLoading,
        sizes: is
    }

}

export default useGetProductSizesPreview