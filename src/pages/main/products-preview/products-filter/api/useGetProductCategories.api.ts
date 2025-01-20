import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { CategorySchema } from "clothing-store-shared/schema"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const useGetProductCategories = () => {

    const params = useParams()

    const { brand,category } = params

    const {isLoading,response,setRequest,clearSideEffects} = useFetchCustom<Array<Omit<CategorySchema.Base, "brand_fk">>>({
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
        return clearSideEffects
    }, [brand,category])

    const is = response.result ? response.result.data : []

    return {
        isLoading,
        categories: is,
        isCategoryMode : !!category
    }

}

export default useGetProductCategories