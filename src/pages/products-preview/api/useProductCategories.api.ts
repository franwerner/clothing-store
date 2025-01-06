import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { isSuccessResponse } from "@/utils/verifyResponsesData.utilts"
import { CategorySchema } from "clothing-store-shared/schema"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const useProductCategories = () => {

    const params = useParams()

    const { brand,category } = params

    const [{ isLoading, response }, { setRequest }] = useFetchCustom<Array<Omit<CategorySchema.Base, "brand_fk">>>({
        target: "categories/brand",
        method: "GET",
    })

    useEffect(() => {
        if(!brand || category) return
        setRequest({
            params: {
                brand
            }
        })
    }, [brand,category])

    const is = isSuccessResponse(response) ? response.result.data : []

    return {
        isLoading,
        categories: is,
        isCategoryMode : !!category
    }

}

export default useProductCategories