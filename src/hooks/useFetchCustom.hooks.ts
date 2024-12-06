import { useAlertContext } from "@/components/AlertGlobal"
import { ResponseToClientError, ResponseToClientSuccess } from "clothing-store-shared/types"
import { isFunction, isNumber } from "my-utilities"
import useFetch, { UseFetchProps } from "./useFetch"

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
        basename: "/api",
        headers: {
            "Content-type": "application/json"
        },
        onFailed: (response) => {

            if (response.result.code?.includes("SQL")) {
                alertHandler({ severity: "warning", text: response.result.message })
            }
            else if (isNumber(response.status) && response.status >= 500) {
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