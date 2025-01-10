import { useAlertContext } from "@/components/AlertGlobal"
import { ResponseToClientError, ResponseToClientSuccess } from "clothing-store-shared/types"
import { isFunction, isNumber } from "my-utilities"
import useFetch, { UseFetch } from "./useFetch"
import localStorageHandler from "@/utils/localStorageHandler.utilts"
import { useDispatch } from "@/store"
import router from "@/router"

type FetchCustomResult<T = any, U = any, K = any> = ResponseToClientSuccess<T> | ResponseToClientError<U, K>


const useFetchCustom = <T = any, U = any, K = any>({ onFailed, ...props }: Omit<UseFetch.Props<
    ResponseToClientSuccess<T>,
    ResponseToClientError<U, K>>, "basename">
) => {
    const alertHandler = useAlertContext()
    const dispatch = useDispatch()
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
            if (code && (code.includes("SQL") || ["rate_limit", "limit_tokens_by_ip"].includes(code))) {
                alertHandler({ severity: "warning", text: message })
            }
            else if (code === "session_expired") {
                alertHandler({ severity: "info", text: message })
                localStorageHandler.removeItem("userHasLoggedIn")
                dispatch(({ user }) => user.remove())
                router.navigate("/cuenta/ingresar")
            }
            else if (isNumber(response.status) && response.status >= 500) {
                alertHandler({ severity: "danger", title: "Servidor no responde.", text: response.status })
            } else if (code === "session_unauthorized") {
                router.navigate("/cuenta/reenviar")
                alertHandler({ severity: "info", text: message })
            }
            if (code === "token_not_found") {
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