import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { isSuccessResponse } from "@/utils/verifyResponsesData.utilts"
import { ProductPreview } from "clothing-store-shared/types"
import { useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"

const useProductSizesPreview = () => {

    const params = useParams()
    const [searchParams] = useSearchParams()

    const queryParams = {
        color: searchParams.get("color") || undefined,
        price: searchParams.get("price") || undefined,
        brand: params.brand,
        category: params.category
    }

    const [{ isLoading, response }, { setRequest }] = useFetchCustom<Array<ProductPreview.Size>>({
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

    }, [JSON.stringify(queryParams)])

    const is = isSuccessResponse(response) ? response.result.data : []

    return {
        isLoading,
        sizes: is
    }

}

export default useProductSizesPreview