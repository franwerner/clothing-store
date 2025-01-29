import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom, { FetchCustomProps } from "@/hooks/useFetchCustom.hooks"
import { RateLimiterResponse } from "clothing-store-shared/types"

const UseOrderFetch = <T = { init_point: string, date_of_expiration: string }, U = RateLimiterResponse>(props: FetchCustomProps<T, U>) => {
    const alertHandler = useAlertContext()

    return useFetchCustom<T, U>({
        target: "orders",
        onFailed: ({ result_error }) => {
            const { message } = result_error
            alertHandler({ description: message, color: "danger" })
        },
        ...props
    })
}

export default UseOrderFetch