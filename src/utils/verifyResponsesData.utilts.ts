import { FetchResponse } from "@/hooks/useFetch";
import { ResponseDataInError, ResponseDataWriteOperationsInError, ResponseDataZodInError, ResponseToClientBase, ResponseToClientError, ResponseToClientSuccess } from "clothing-store-shared/types";

function isZodErrorResponse<T, U, K>(
    response: FetchResponse<ResponseToClientSuccess<T> | ResponseToClientError<U, K>>
): response is FetchResponse<ResponseToClientBase & {data?:ResponseDataZodInError<K>}> {
    return response.result.code === "zod_err" && !response.success
}

function isWriteOperationErrorResponse<T, U, K>(
    response: FetchResponse<ResponseToClientSuccess<T> | ResponseToClientError<U, K>>
): response is FetchResponse<ResponseToClientBase & {data?:ResponseDataWriteOperationsInError<K>}>  {
    return (response.result.code || "").includes("write_failed") && !response.success
}

function isErrorResponse<T, U, K>(
    response:FetchResponse<ResponseToClientSuccess<T> | ResponseToClientError<U, K>>
): response is FetchResponse<ResponseToClientBase & {data?:ResponseDataInError<U>}> {
    return !response.success
}

function isSuccessResponse<T, U, K>(
    response: FetchResponse<ResponseToClientSuccess<T> | ResponseToClientError<U, K>>
): response is FetchResponse<ResponseToClientSuccess<T>> {
    return !!(response.success  && !response.result.code)
}
export {
    isErrorResponse,
    isSuccessResponse,
    isWriteOperationErrorResponse,
    isZodErrorResponse
};

