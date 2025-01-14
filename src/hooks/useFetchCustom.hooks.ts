import { useAlertContext } from "@/components/AlertGlobal"
import { ResponseToClientError, ResponseToClientSuccess } from "clothing-store-shared/types"
import { isFunction, isNumber } from "my-utilities"
import localStorageHandler from "@/utils/localStorageHandler.utilts"
import { useDispatch } from "@/store"
import router from "@/router"
import { UseFetch, useFetch } from "my-hooks"
import useResetStore from "./useResetStore.hooks"

type FetchCustomResult<T = any, U = any, K = any> = ResponseToClientSuccess<T> | ResponseToClientError<U, K>

const useFetchCustom = <T = any, U = any, K = any>({ onFailed, ...props }: Omit<UseFetch.Props<
    ResponseToClientSuccess<T>,
    ResponseToClientError<U, K>>, "basename">
) => {
    const alertHandler = useAlertContext()
    const resetStore = useResetStore()
    return useFetch<
        ResponseToClientSuccess<T>,
        ResponseToClientError<U, K>
    >({
        basename: "/api/",
        headers: {
            "Content-type": "application/json"
        },
        onFailed: (response) => {
            const { code, message } = response.result_error ?? {}


            if (code === "session_expired" && localStorageHandler.getItem("userHasLoggedIn")) {
                localStorageHandler.removeItem("userHasLoggedIn")
            }

            if (code && (code.includes("SQL") || ["rate_limit", "limit_tokens_by_ip"].includes(code))) {
                alertHandler({ severity: "warning", text: message })
            }
            else if (code === "err_internal") {
                alertHandler({ severity: "danger", text: message })
            }
            else if (code === "session_expired") {
                alertHandler({ severity: "info", text: message })
                resetStore()
                router.navigate("/cuenta/ingresar")
            }
            else if (isNumber(response.status) && response.status >= 500) {
                alertHandler({ severity: "danger", title: "Servidor no responde.", text: response.status })
            } else if (code === "session_not_complete") {
                router.navigate("/cuenta/reenviar")
                alertHandler({ severity: "info", text: message })
            }
            else if (code === "token_not_found") {
                router.navigate("/")
                alertHandler({ severity: "warning", text: message })
            }
            else {
                isFunction(onFailed) && onFailed(response)
            }

        },
        ...props
    })

}


export {
    type FetchCustomResult
}
export default useFetchCustom