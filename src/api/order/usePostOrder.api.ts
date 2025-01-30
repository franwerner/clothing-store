import { useAlertContext } from "@/containers/alert-global"
import { useDispatch } from "@/store"
import { UserPurchaseAddressesSchema } from "clothing-store-shared/schema"
import UseOrderFetch from "."

const usePostOrder = (order_address: Omit<UserPurchaseAddressesSchema.Insert, "user_purchase_fk">) => {
    const alertHandler = useAlertContext()
    const dispatch = useDispatch()
    return UseOrderFetch<{ init_point: string, date_of_expiration: string }>({
        method: "POST",
        body: {
            order_address
        },
        onSuccess: ({ result }) => {
            const { message, data } = result
            alertHandler({ description: message, color: "success" })
            dispatch(({ shopcart }) => shopcart.reset())
            window.open(data.init_point, "_blank")
        },
    })
}

export default usePostOrder