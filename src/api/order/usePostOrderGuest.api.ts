import { useAlertContext } from "@/containers/alert-global"
import { useDispatch } from "@/store"
import { UserPurchaseAddressesSchema, UserPurchaseGuestsSchema } from "clothing-store-shared/schema"
import UseOrderFetch from "."
interface PostOrderGuest {
    order_guest: Omit<UserPurchaseGuestsSchema.Insert, "user_purchase_fk">
    order_address: Omit<UserPurchaseAddressesSchema.Insert, "user_purchase_fk">

}
const usePostOrderGuest = ({ order_guest, order_address }: PostOrderGuest) => {
    const alertHandler = useAlertContext()
    const dispatch = useDispatch()
    return UseOrderFetch<{ init_point: string, date_of_expiration: string }>({
        target: "orders/guest",
        method: "POST",
        body: {
            order_guest,
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

export default usePostOrderGuest