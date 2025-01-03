import { useAlertContext } from "@/components/AlertGlobal"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"
import { ShopcartProductSchema } from "clothing-store-shared/schema"

const useShopcartChangeProductQuantity = () => {
    const alertHandler = useAlertContext()
    const dispatch = useDispatch()
    return useFetchCustom<ShopcartProductSchema.BaseInShopcart>({
        target: "/shopcart",
        method: "PATCH",
        onFailed: ({ result }) => {
            const { code, message } = result
            if (code && ["expired_shopcart", "unavailable_shopcart"].includes(code)) {
                alertHandler({
                    severity: "danger",
                    text: message
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

export default useShopcartChangeProductQuantity