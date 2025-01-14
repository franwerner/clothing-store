import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { BrandSchema } from "clothing-store-shared/schema"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const useProductBrands = () => {

    const {brand} = useParams()

    const {isLoading,response,setRequest,clearSideEffects} = useFetchCustom<Array<BrandSchema.Base>>({
        target: "brands",
        method: "GET",
    })

    useEffect(() => {
        if(brand) return
        setRequest()
        return clearSideEffects
    }, [brand])

    const is = response.result ? response.result.data : []

    return {
        isLoading,
        brands : is,
        isBrandMode : !!brand
    }

}

export default useProductBrands