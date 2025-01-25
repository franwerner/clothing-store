import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { UserPurchaseAddressesSchema } from "clothing-store-shared/schema"

const usePostOrder = (order_address: Omit<UserPurchaseAddressesSchema.Insert, "user_purchase_fk">) => {

    const alertHandler = useAlertContext()

    return useFetchCustom<{ init_point: string, date_of_expiration: string }>({
        target: "orders",
        method: "POST",
        body : {
            order_address
        },
        onSuccess: ({ result }) => {
            const { message, data } = result
            alertHandler({ description: message, color: "success" })
            window.open(data.init_point, "_self")
        },
        onFailed: ({ result_error }) => {
            const { message } = result_error
            alertHandler({ description: message, color: "danger" })
        }
    })
}

export default usePostOrder