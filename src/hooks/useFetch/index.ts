import { useEffect, useState } from "react"
import queryToString from "./utils/queryToString.utilts"
import { isFunction, isNumber, isString } from "my-utilities"
import useAbortSignal from "./useAbortSignal.useFetch"
import useDelay from "./useDelay.useFetch"

type Target = string | URL | globalThis.Request

type FetchQuery = { [key: string]: string | number | undefined }
interface UseFetchProps<T = any> extends Omit<RequestInit, "signal" | "body"> {
    target: Target,
    basename?: string
    query?: FetchQuery,
    onSuccess?: (response: FetchResponse<T>) => void,
    onFailed?: (response: FetchResponse<T>) => void
    body?: { [key: string]: any }
    delay?: number
}

interface FetchResponse<T = any> {
    status?: number | string,
    success?: boolean
    result: T
}

const useFetch = <T extends object = {}>({
    ...request
}: UseFetchProps<T>) => {
    const { abortSignal, createSignal, setSignalUsed, getSignal } = useAbortSignal()
    const { cleanDelay, createDelay } = useDelay()
    const [isLoading, setLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<FetchResponse<T>>({
        result: {} as T,
        success: undefined,
        status: undefined
    })
    const setRequest = (props: Partial<UseFetchProps<T>> = {}) => {
        const { target, query, onSuccess, onFailed, body = {}, delay, basename, ...rest } = { ...request, ...props }
        abortSignal()
        createSignal()
        createDelay(async () => {
            {
                const concatTarget = `${basename}${target}${queryToString(query)}`
                try {
                    setLoading(true)
                    setSignalUsed(true)
                    const res = await fetch(concatTarget, {
                        ...rest,
                        ...(rest.method === "GET" ? {} : { body: JSON.stringify(body) }),
                        signal: getSignal().signal,
                    })
                    const json = await res.json()
                    const response = {
                        result: json,
                        status: res.status,
                        success: res.ok,
                    }
                    isFunction(onSuccess) && res.ok && onSuccess(response)
                    isFunction(onFailed) && !res.ok && onFailed(response)
                    setResponse(response)
                } catch (error: any) {
                    const response = {
                        result: {} as T,
                        status: isString(error) || isNumber(error) ? error : "Unknown error",
                        success: false
                    }
                    isFunction(onFailed) && onFailed(response)
                    setResponse(response)
                }
                finally {
                    setSignalUsed(false)
                    setLoading(false)
                }
            }
        }, delay)
    }
    useEffect(() => {
        return () => {
            cleanDelay()
            abortSignal()
        }
    }, [])

    return [
        {
            isLoading,
            response,
        },
        {
            setRequest,
        }
    ] as const
}

export type {
    UseFetchProps,
    FetchResponse,
    FetchQuery
}
export default useFetch
