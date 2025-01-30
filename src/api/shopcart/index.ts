import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom, { FetchCustomProps } from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"
import { RateLimiterResponse } from "clothing-store-shared/types"

const useShopcartFetch = <T = any, U = RateLimiterResponse>(props: FetchCustomProps<T, U>) => {
    const dispatch = useDispatch()
    const alertHandler = useAlertContext()
    return useFetchCustom<T, U>({
        target: "/shopcart",
        onFailed(response) {
            const { message, code } = response.result_error
            if (code === "shopcart_not_found") return

            alertHandler({ color: "danger", description: message })
            if (code === "expired_shopcart") {
                dispatch(({ shopcart }) => shopcart.reset())
            }
        },
        ...props
    })
}

export default useShopcartFetch