import { RateLimiterResponse, ResponseDataWriteOperationsInError, ResponseToClientBase, ResponseToClientError, ResponseToClientSuccess } from "clothing-store-shared/types";
import { UseFetch } from "my-hooks";

/**
 * Si se utiliza para verificar las respuestas segun el tipo que querrramos trabjar, se deben hacer en un contexto donde esperemos utilizar la data que esta nos proporciona.
 */

function isWriteOperationErrorResponse<T, U, K>(
    response: UseFetch.Response<ResponseToClientSuccess<T>, ResponseToClientError<U, K>>
): response is UseFetch.FailedResponse<ResponseToClientBase & { data: ResponseDataWriteOperationsInError<K> }> {
    return !!(response.result_error && (response.result_error.code || "").includes("write_failed"))
}

function getRateLimiterData<T, U, K>(
    response: UseFetch.Response<ResponseToClientSuccess<T>, ResponseToClientError<U, K>>
) {
    const res = response.result_error && response.result_error.code == "rate_limit" ? response.result_error.data : {}
    return res as RateLimiterResponse
}

export {
    getRateLimiterData, isWriteOperationErrorResponse
};

