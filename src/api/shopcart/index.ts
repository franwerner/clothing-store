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
            if (code === "expired_shopcart") {
                alertHandler({ color: "danger", description: message })
                dispatch(({ shopcart }) => shopcart.reset())
            } else if (code === "product_not_available") {
                alertHandler({ color: "warning", description: message })
            }
        },
        ...props
    })
}

export default useShopcartFetch