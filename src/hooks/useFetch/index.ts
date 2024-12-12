import { isFunction } from "my-utilities"
import { useEffect, useRef, useState } from "react"
import useAbortSignal from "./useAbortSignal.useFetch"
import useDelay from "./useDelay.useFetch"
import queryToString from "./utils/queryToString.utilts"
import "./utils/paramsToString.utilts"
import paramsToString from "./utils/paramsToString.utilts"

type Target = string

type UrlQueryParams = { [key: string]: string | number | undefined }
interface UseFetchProps<T = any, U = any,> extends Omit<RequestInit, "signal" | "body"> {
    target: Target,
    basename?: string
    query?: UrlQueryParams,
    onSuccess?: (response: FetchResponse<T>) => void
    onFailed?: (response: FetchResponse<U>) => void
    body?: { [key: string]: any }
    delay?: number,
    params?: UrlQueryParams
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
    const refMounting = useRef(true)
    /**
     * Garantizamos que el componente se encuentre montado para que en casos de que el fetch de error o se aplique un abort la logica se ejecuta en el contexto correcto.
     */
    const { cleanDelay, createDelay } = useDelay()
    const [isLoading, setLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<FetchResponse<T | U>>({
        result: {} as T | U,
        success: undefined,
        status: undefined
    })
    const setRequest = (props: Omit<Partial<UseFetchProps<T, U>>, "target"> = {}) => {
        const { target, query, onSuccess, onFailed, body = {}, params = {}, delay,method = "GET",basename, ...rest } = { ...request, ...props }
        abortSignal()
        createSignal()
        createDelay(async () => {
            {
                const concatTarget = `${paramsToString(params, basename + target)}${queryToString(query)}`.replaceAll("//", "/")

                try {
                    setLoading(true)
                    setSignalUsed(true)
                    const res = await fetch(concatTarget, {
                        ...rest,
                        ...(method === "GET" ? {} : { body: JSON.stringify(body) }),
                        signal: getSignal().signal,
                        method
                    })
                    const json = await res.json()
                    const response = {
                        result: json || {},
                        status: res.status,
                        success: res.ok,
                    }
                    if (!refMounting.current) return
                    isFunction(onSuccess) && res.ok && onSuccess(response)
                    isFunction(onFailed) && !res.ok && onFailed(response)
                    setResponse(response)
                } catch (error: any) {
                    if (!refMounting.current) return
                    const response = {
                        result: {} as U,
                        status: 500,
                        success: false
                    }
                    isFunction(onFailed) && onFailed(response)
                    setResponse(response)
                }
                finally {
                    if (!refMounting.current) return
                    setSignalUsed(false)
                    setLoading(false)
                }
            }
        }, delay)
    }
    useEffect(() => {
        refMounting.current = true
        return () => {
            refMounting.current = false
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
    UrlQueryParams,
    FetchResponse,
    UseFetchProps,
    Target
}

export default useFetch


