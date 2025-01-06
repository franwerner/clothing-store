import { isFunction } from "my-utilities"
import { useEffect, useRef, useState } from "react"
import useAbortSignal from "./useAbortSignal.useFetch"
import useDelay from "./useDelay.useFetch"
import "./utils/adaptParamsToUrl.utilts"
import unifyProps from "./utils/unifyProps.utilts"
import adaptParamsToUrl from "./utils/adaptParamsToUrl.utilts"
import adaptQuerysToUrl from "./utils/adaptQuerysToUrl.utilts"

declare namespace UseFetch {
    interface Response<T = any> {
        status?: number,
        success?: boolean
        result: T
    }

    type QueryParams = { [key: string]: string | number | undefined | null | boolean }

    interface Props<T = any, U = any,> extends Omit<RequestInit, "signal" | "body"> {
        target?: string,
        basename?: string
        query?: QueryParams,
        onSuccess?: (response: Response<T>) => void
        onFailed?: (response: Response<U>) => void
        body?: { [key: string]: any }
        delay?: number,
        params?: QueryParams
    }

    type SetRequestProps<T, U> = Omit<Partial<Props<T, U>>, "target" | "basename">
}

/**
 * @Introducción
 * Este hook está diseñado para gestionar solicitudes `fetch` únicas, asegurando que:
 * 
 * - **Gestión de solicitudes únicas**:
 *   - Cada solicitud genera un identificador único `request_id` para garantizar que solo la solicitud más reciente pueda actualizar el estado de React.
 *   - Si una solicitud es abortada, cualquier intento de actualizar el estado relacionado será ignorado.
 *   - Toda nueva ejecuccion de `setRequest()` aborta la solicitud inclusive si la respuesta del fetch ya se encuentra en la task queue lista par ser ejecutada.
 * 
 * 
 * @Nota
 * - Este comportamiento es crucial en escenarios donde se generan múltiples solicitudes de forma concurrente.
 * - Debido a la naturaleza de `async/await` y la liberación de la callstack, una solicitud anterior podría intentar actualizar el estado después de haber sido abortada.
 * - Este hook previene tales escenarios garantizando que solo la solicitud más reciente sea relevante para el estado.
 * 
 * @Ejemplo
 * Supongamos que el usuario hace clic rápidamente en un botón que genera solicitudes consecutivas:
 * 
 * 1. La primera solicitud comienza, pero antes de completarse, se genera una segunda solicitud.
 * 2. La primera solicitud se aborta y su estado asociado no se actualizará.
 * 3. Solo la segunda solicitud (la más reciente) determinará el estado final.
 * 
 * @Beneficio
 * Este enfoque asegura que el estado de la aplicación sea coherente y evite actualizaciones redundantes o incorrectas causadas por solicitudes anteriores.
 */

/**
 * T = Valores success.
 * U = Valores failed
 * Esto no permite definir que recibira tanto onSuccess y onFailed.
 * la propiedad `result` recibira una combinacion de estos 2 tipos.
 */


const useFetch = <T extends object = {}, U extends object = {}>({
    ...request
}: UseFetch.Props<T, U>) => {
    const { abortSignal, createSignal, setSignalUsed, getSignal } = useAbortSignal()
    const ref = useRef({ is_mounting: true, request_id: 0 })
    /**
     * @is_mounting :Garantizamos que el componente se encuentre montado para que en casos de que el fetch de error o se aplique un abort la logica se ejecuta en el contexto correcto.
     * @request_id : Nos ayuda a indentificar la ejecuccion  del ultimo request, para que una request anterior no modifique el estado de la nueva request,
     *  en casos de que 2 solicitudes se esten procesando al mismo tiempo.
     */
    const { cleanDelay, createDelay } = useDelay()
    const [isLoading, setLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<UseFetch.Response<T | U>>({
        result: {} as T | U,
        success: undefined,
        status: undefined
    })
    const setRequest = (props: UseFetch.SetRequestProps<T, U> = {}) => {
        const currentProps = unifyProps(request, props)
        const { target = "/", query, onSuccess, onFailed, body = {}, params = {}, delay, method = "GET", basename, ...rest } = currentProps
        abortSignal()
        createDelay(async () => {
            createSignal()
            const context_id = ++ref.current.request_id
            {
                const concatTarget = `${adaptParamsToUrl(params, basename + target)}${adaptQuerysToUrl(query)}`.replaceAll("//", "/")
                try {
                    setLoading(true)
                    setSignalUsed(true)
                    const res = await fetch(concatTarget, {
                        ...rest,
                        ...(method.toLowerCase() === "get" ? {} : { body: JSON.stringify(body) }),
                        signal: getSignal().signal,
                        method
                    })

                    const json = await res.json() //Si la señal se aborta, inclusive despues de que el fetch se resuelvan esto dara error.
                    const response = {
                        result: json,
                        status: res.status,
                        success: res.ok,
                    }
                    if (!ref.current.is_mounting || context_id !== ref.current.request_id) return
                    isFunction(onSuccess) && res.ok && onSuccess(response)
                    isFunction(onFailed) && !res.ok && onFailed(response)

                    setResponse(response)
                } catch (error: any) {
                    if (!ref.current.is_mounting || context_id !== ref.current.request_id) return
                    const response = {
                        result: {} as U,
                        status: error === "abort-cleanup" ? undefined : 500,
                        success: false
                    }
                    setResponse(response)
                    isFunction(onFailed) && onFailed(response)
                }
                finally {
                    if (!ref.current.is_mounting || context_id !== ref.current.request_id) return
                    setSignalUsed(false)
                    setLoading(false)
                }
            }
        }, delay)
    }

    useEffect(() => {
        ref.current.is_mounting = true
        return () => {
            ref.current.is_mounting = false
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



export type { UseFetch }

export default useFetch


