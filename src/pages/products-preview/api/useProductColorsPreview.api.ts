import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { isSuccessResponse } from "@/utils/verifyResponsesData.utilts"
import { ProductPreview } from "clothing-store-shared/types"
import { useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"

const useProductColorsPreview = () => {

    const params = useParams()

    const [searchParams] = useSearchParams()

    const queryParams = {
        size: searchParams.get("size") || undefined,
        price: searchParams.get("price") || undefined,
        brand: params.brand,
        category: params.category
    }

const [{ isLoading, response }, { setRequest }] = useFetchCustom<Array<ProductPreview.Color>>({
    target: "products/view/preview/colors",
    method: "GET"
})

useEffect(() => {
    const { brand, category, price, size } = queryParams
    setRequest({
        query: {
            price,
            size,
            brand,
            category
        }
    })

}, [JSON.stringify(queryParams)])

const is = isSuccessResponse(response) ? response.result.data : []

return {
    isLoading,
    colors: is
}

}

export default useProductColorsPreview