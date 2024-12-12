import { useAlertContext } from "@/components/AlertGlobal"
import { ResponseToClientError, ResponseToClientSuccess } from "clothing-store-shared/types"
import { isFunction, isNumber } from "my-utilities"
import useFetch, { UseFetchProps } from "./useFetch"
import localStorageHandler from "@/utils/localStorageHandler.utilts"

type FetchCustomResult<T = any, U = any, K = any> = ResponseToClientSuccess<T> | ResponseToClientError<U, K>


const useFetchCustom = <T = any, U = any, K = any>({ onFailed, ...props }: UseFetchProps<
    ResponseToClientSuccess<T>,
    ResponseToClientError<U, K>
>) => {
    const alertHandler = useAlertContext()
    return useFetch<
        ResponseToClientSuccess<T>,
        ResponseToClientError<U, K>
    >({
        basename: "/api/",
        headers: {
            "Content-type": "application/json"
        },
        onFailed: (response) => {
            const code = response.result.code
            if (code && (code.includes("SQL") || ["rate_limit", "limit_tokens_by_ip","token_not_found"].includes(code))) {
                alertHandler({ severity: "warning", text: response.result.message })
            }
            else if (code === "session_expired") {
                alertHandler({ severity: "info", text: response.result.message })
                localStorageHandler.removeItem("userHasLoggedIn")
            }
            else if (isNumber(response.status) && response.status >= 500 || code === "session_unauthorized") {
                alertHandler({ severity: "danger", title: "Servidor no responde.", text: response.status })
            }
            isFunction(onFailed) && onFailed(response)
        },
        ...props
    })

}


export {
    type FetchCustomResult
}
export default useFetchCustom