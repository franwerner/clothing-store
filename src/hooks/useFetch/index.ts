import { isFunction } from "my-utilities"
import { useEffect, useState } from "react"
import useAbortSignal from "./useAbortSignal.useFetch"
import useDelay from "./useDelay.useFetch"
import queryToString from "./utils/queryToString.utilts"

type Target = string | URL | globalThis.Request

type FetchQuery = { [key: string]: string | number | undefined }
interface UseFetchProps<T = any, U = any,> extends Omit<RequestInit, "signal" | "body"> {
    target: Target,
    basename?: string
    query?: FetchQuery,
    onSuccess?: (response: FetchResponse<T>) => void
    onFailed?: (response: FetchResponse<U>) => void
    body?: { [key: string]: any }
    delay?: number
}

interface FetchResponse<T = any> {
    status?: number,
    success?: boolean
    result: T
}

/**
 * T = Valores success.
 * U = Valores failed
 * Esto no permite definir que recibira tanto onSuccess y onFailed.
 * la propiedad `result` recibira una combinacion de estos 2 tipos.
 */
const useFetch = <T extends object = {}, U extends object = {}>({
    ...request
}: UseFetchProps<T, U>) => {
    const { abortSignal, createSignal, setSignalUsed, getSignal } = useAbortSignal()
    const { cleanDelay, createDelay } = useDelay()
    const [isLoading, setLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<FetchResponse<T | U>>({
        result: {} as T | U,
        success: undefined,
        status: undefined
    })
    const setRequest = (props: Partial<UseFetchProps<T,U>> = {}) => {
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
                        result: json || {},
                        status: res.status,
                        success: res.ok,
                    }
                    isFunction(onSuccess) && res.ok && onSuccess(response)
                    isFunction(onFailed) && !res.ok && onFailed(response)
                    setResponse(response)
                } catch (error: any) {
                    const response = {
                        result: {} as U,
                        status: 500,
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
    FetchQuery, FetchResponse, UseFetchProps
}
export default useFetch
