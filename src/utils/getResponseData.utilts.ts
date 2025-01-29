import { FetchCustomResponse } from "@/hooks/useFetchCustom.hooks";
import { RateLimiterResponse } from "clothing-store-shared/types";

/**
 * Si se utiliza para verificar las respuestas segun el tipo que querrramos trabjar, se deben hacer en un contexto donde esperemos utilizar la data que esta nos proporciona.
 */

// function isWriteOperationErrorResponse<T, U, K>(
//     response: UseFetch.Response<ResponseToClientSuccess<T>, ResponseToClientError<U, K>>
// ): response is UseFetch.FailedResponse<ResponseToClientBase & { data: ResponseDataWriteOperationsInError<K> }> {
//     return !!(response.result_error && (response.result_error.code || "").includes("write_failed"))
// }

function getFailedData<T, U,H>(
    response: FetchCustomResponse<T, U>,
    defaultValue?: H //Utilizar en casos donde se desee utilizar un valor por defecto para que no rompa la app
) {
    const res = response.result_error && response.result_error.code !== "rate_limit" ? response.result_error.data : (defaultValue ?? {})
    return res as U
}

function getRateLimiterData<T, U>(
    response: FetchCustomResponse<T, U>
) {
    const res = response.result_error && response.result_error.code == "rate_limit" ? response.result_error.data : {}
    return res as RateLimiterResponse
}

export {
    getRateLimiterData,
    getFailedData
};

