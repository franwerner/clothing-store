import { useAlertContext } from "@/containers/alert-global"
import { useDispatch } from "@/store"
import { ShopcartProductSchema } from "clothing-store-shared/schema"
import useShopcartFetch from "."

const usePostShopcartProducts = (products: Array<ShopcartProductSchema.BaseOutShopcart>) => {
    const dispatch = useDispatch()
    const alertHandler = useAlertContext()
    return useShopcartFetch<Array<ShopcartProductSchema.BaseInShopcart>>({
        method: "POST",
        body: {
            products
        },
        onSuccess: ({ result }) => {
            const data = result.data
            dispatch(({ shopcart }) => shopcart.addProducts(data))
            alertHandler({
                color: "success",
                description: result.message
            })
        },
    })
}

export default usePostShopcartProducts