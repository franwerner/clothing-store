import { FetchResponse } from "@/hooks/useFetch";
import { RateLimiterResponse, ResponseDataWriteOperationsInError, ResponseDataZodInError, ResponseToClientBase, ResponseToClientError, ResponseToClientSuccess } from "clothing-store-shared/types";

/**
 * Si se utiliza para verificar las respuestas segun el tipo que querrramos trabjar, se deben hacer en un contexto donde esperemos utilizar la data que esta nos proporciona.
 */

function isZodErrorResponse<T, U, K>(
    response: FetchResponse<ResponseToClientSuccess<T> | ResponseToClientError<U, K>>
): response is FetchResponse<ResponseToClientBase & { data: ResponseDataZodInError<K> }> {
    return response.result.code === "zod_err" && !response.success && !!(response.result.data)
}

function isWriteOperationErrorResponse<T, U, K>(
    response: FetchResponse<ResponseToClientSuccess<T> | ResponseToClientError<U, K>>
): response is FetchResponse<ResponseToClientBase & { data: ResponseDataWriteOperationsInError<K> }> {
    return (response.result.code || "").includes("write_failed") && !response.success && !!(response.result.data)
}

function isErrorResponse<T, U, K>(
    response: FetchResponse<ResponseToClientSuccess<T> | ResponseToClientError<U, K>>
): response is FetchResponse<ResponseToClientBase & { data: U }> {
    return !response.success && !!(response.result.data)
}

function isRateLimiterResponse<T, U, K>(
    response: FetchResponse<ResponseToClientSuccess<T> | ResponseToClientError<U, K>>
): response is FetchResponse<ResponseToClientBase & { data: RateLimiterResponse }> {
    return !response.success && response.result.code == "rate_limit" && !!(response.result.data)
}

function isSuccessResponse<T, U, K>(
    response: FetchResponse<ResponseToClientSuccess<T> | ResponseToClientError<U, K>>
): response is FetchResponse<ResponseToClientBase & { data: T }> {
    return !!(response.success && response.result.data)
}

export {
    isErrorResponse,
    isSuccessResponse,
    isWriteOperationErrorResponse,
    isZodErrorResponse,
    isRateLimiterResponse
};

