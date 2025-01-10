import { useAlertContext } from "@/components/AlertGlobal"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"

const useCreateOrder = () => {

    const alertHandler = useAlertContext()
    const dispatch = useDispatch()

    return useFetchCustom<{ init_point: string, date_of_expiration: string }>({
        target: "orders",
        method: "POST",
        onSuccess: ({ result }) => {
            const { message } = result
            alertHandler({ text: message, severity: "success" })
            dispatch(({ shopcart }) => shopcart.reset())
        },
        onFailed: ({ result_error }) => {
            const { message } = result_error
            alertHandler({ text: message, severity: "danger" })
        }
    })
}

export default useCreateOrder