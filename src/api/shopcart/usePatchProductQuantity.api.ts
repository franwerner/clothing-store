import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"
import { ShopcartProductSchema } from "clothing-store-shared/schema"

const usePatchShopcartProductQuantity = () => {
    const alertHandler = useAlertContext()
    const dispatch = useDispatch()
    return useFetchCustom<ShopcartProductSchema.BaseInShopcart>({
        target: "/shopcart",
        method: "PATCH",
        onFailed: ({ result_error }) => {
            const { code, message } = result_error
            if (code && ["expired_shopcart", "unavailable_shopcart"].includes(code)) {
                alertHandler({
                    color: "danger",
                    description: message
                })
            }
        },
        onSuccess: ({ result }) => {
            const { id, quantity } = result.data
            dispatch(({ shopcart }) => shopcart.changeQuantity({
                id,
                quantity: quantity
            }))
        }
    })
}

export default usePatchShopcartProductQuantity