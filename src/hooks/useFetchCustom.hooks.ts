import { useAlertContext } from "@/containers/alert-global"
import router from "@/router"
import localStorageHandler from "@/utils/localStorageHandler.utilts"
import { RateLimiterResponse, ResponseToClient, ResponseToClientError } from "clothing-store-shared/types"
import { UseFetch, useFetch } from "my-hooks"
import { isFunction } from "my-utilities"
import useResetStore from "./useResetStore.hooks"


type FetchCustomResponse<T = any, U = RateLimiterResponse> = UseFetch.Response<ResponseToClient<T>, ResponseToClientError<U>>
type FetchCustomProps<T = any, U = RateLimiterResponse> = Omit<UseFetch.Props<ResponseToClient<T>, ResponseToClientError<U>>, "basename">

type Props<T = any, U = RateLimiterResponse> = Omit<FetchCustomProps<T, U>, "onFailed">
    & { onFailed?: (response: Required<UseFetch.FailedResponse<ResponseToClientError<U>>>, handled: boolean) => void, failedTrigger?: boolean }

/**
 * Los genericos esperandos, son valores que van directamente a la propiedad data del `ResponseToClient`
 */

const useFetchCustom = <T = any, U = RateLimiterResponse>({ onFailed, failedTrigger, ...props }: Props<T, U>) => {
    const alertHandler = useAlertContext()
    const resetStore = useResetStore()

    return useFetch<ResponseToClient<T>, ResponseToClientError<U>>({
        basename: "/api/",
        headers: {
            "Content-type": "application/json"
        },
        onFailed: (response) => {
            const { code, message } = response.result_error ?? {}

            let handled = true

            if (code && ["rate_limit", "limit_tokens_by_ip"].includes(code)) {
                alertHandler({ color: "warning", description: message })
            }
            else if (code === "session_expired") {
                localStorageHandler.removeItem("userHasLoggedIn")
                alertHandler({ color: "primary", description: message })
                resetStore()
                router.navigate("/cuenta/ingresar")
            }
            else if (response.status == 500 || code && code.includes("SQL")) {
                alertHandler({ color: "danger", title: "Servidor no responde." })
            } else if (code === "session_not_complete") {
                router.navigate("/cuenta/reenviar")
                alertHandler({ color: "primary", description: message })
            }
            else if (code === "token_not_found") {
                router.navigate("/")
                alertHandler({ color: "warning", description: message })
            }
            else if (code === "app_maintenance") {
                router.navigate("/")
            } else {
                handled = false
            }

            if (isFunction(onFailed) && (failedTrigger || !handled)) {
                onFailed(response, handled)
            }
        },
        ...props
    })

}

export {
    type FetchCustomProps, type FetchCustomResponse,
}
export default useFetchCustom