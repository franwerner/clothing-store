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
            if (code === "shopcart_not_found") {
                dispatch(({ shopcart }, state) => {
                    if (state.shopcart.products.length > 0) shopcart.reset()
                })
                return
            } else if (code === "expired_shopcart") {
                dispatch(({ shopcart }) => shopcart.reset())
            }

            alertHandler({ color: "danger", description: message })
        },
        ...props
    })
}

export default useShopcartFetch