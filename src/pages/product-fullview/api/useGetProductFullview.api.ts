import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { isSuccessResponse } from "@/utils/verifyResponsesData.utilts"
import { ProductFullview } from "clothing-store-shared/types"
import { useEffect } from "react"
import { useParams } from "react-router-dom"


const useGetProductFullview = () => {

    const params = useParams()

    const { category, brand, product } = params

    const [{ isLoading, response }, { setRequest }] = useFetchCustom<ProductFullview.Base>({
        target: "products/view/fullview",
        params: {
            brand,
            category,
            product
        }
    })

    useEffect(()=>{
        setRequest()
    },[])
 
    const is = isSuccessResponse(response) ? response.result.data : {} as ProductFullview.Base

    return {
        details : is,
        success : response.success,
        code : response.result.code,
        isLoading,
    }

}

export default useGetProductFullview