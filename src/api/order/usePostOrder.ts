import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"

const usePostOrder = () => {

    const alertHandler = useAlertContext()
    const dispatch = useDispatch()

    return useFetchCustom<{ init_point: string, date_of_expiration: string }>({
        target: "orders",
        method: "POST",
        onSuccess: ({ result }) => {
            const { message } = result
            alertHandler({ description: message, color: "success" })
            dispatch(({ shopcart }) => shopcart.reset())
        },
        onFailed: ({ result_error }) => {
            const { message } = result_error
            alertHandler({ description: message, color: "danger" })
        }
    })
}

export default usePostOrder