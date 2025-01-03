import { useAlertContext } from "@/components/AlertGlobal"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"
import { ShopcartProductSchema } from "clothing-store-shared/schema"

const useShopcartAddProducts = (products: Array<ShopcartProductSchema.BaseOutShopcart>) => {

    const dispatch = useDispatch()

    const alertHandler = useAlertContext()

    return useFetchCustom<Array<ShopcartProductSchema.BaseInShopcart>>({
        target: "/shopcart",
        method: "POST",
        body: {
            products
        },
        onSuccess: ({ result }) => {
            const data = result.data
            dispatch(({ shopcart }) => shopcart.addProducts(data))
        },
        onFailed : ({result}) => {
             alertHandler({
                color : "danger",
                text : result.message
             })
        }
    })
}

export default useShopcartAddProducts