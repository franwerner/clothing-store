import { isNumber, isString } from "my-utilities"
import { useEffect, useRef, useState } from "react"

interface useFetchAbortController {
    controller: AbortController,
    waiting_time?: number,//Solo segundo no decimales.
    on?: (signal: AbortSignal) => void
}

type Target = string | URL | globalThis.Request

interface UseFetchProps extends Omit<RequestInit, "signal"> {
    target: Target,
    abortController?: useFetchAbortController
}

interface UseFetchResponse<T = any> {
    status: {
        code?: number | string
    },
    data?: T
}

const errorStatusCodes = [
    400,
    401,
    403,
    404,
    405,
    408,
    429,
    500,
    501,
    502,
    503,
    504
]

interface HandlerSideEffectAbortController {
    controller: AbortController
    on?: (signal: AbortSignal) => void
    waiting_time?: number
    fetchStatus?: "complete"
    timeoutID: number
}

class HandlerSideEffectAbortController {
    private final_listener?: (signal: Event) => void
    constructor({ controller, on, waiting_time }: useFetchAbortController) {
        this.controller = controller
        this.on = on
        this.waiting_time = waiting_time
        this.fetchStatus = undefined
        this.timeoutID = 0
        this.final_listener = () => { }
    }

    removeListener() {
        if (!this.final_listener) return console.error("You must add a listener first to delete another one")
        this.controller.signal.removeEventListener("abort", this.final_listener)
    }

    addListener() {
        this.final_listener = (e) => this.on && this.on(e.currentTarget as AbortSignal)
        this.controller.signal.addEventListener("abort", this.final_listener)
    }

    setTimeout() {
        if (this.waiting_time) {
            //@ts-ignore
            this.timeoutID = setTimeout(() => {
                if (this.fetchStatus) return
                this.controller.abort("not_response")
            }, this.waiting_time * 1000);
        }
    }

    clearTimeout() {
        clearTimeout(this.timeoutID)
    }

    abort() {
        if (this.fetchStatus) return
        this.controller.abort("target_change")
    }

    setFetchStatus(value?: "complete") {
        this.fetchStatus = value
    }

}

const useFetch = <T = any>({
    target,
    abortController,
    ...request
}: UseFetchProps) => {

    const ref = useRef<HandlerSideEffectAbortController>()

    const [isLoading, setLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<UseFetchResponse<T>>({
        data: undefined,
        status: {
            code: undefined
        },
    })

    const requestComplete = () => {
        setLoading(false)
        if (ref.current) {
            ref.current.clearTimeout()
            ref.current.setFetchStatus("complete")
        }
    }

    const setRequest = async () => {
        try {
            !isLoading && setLoading(true)
            const res = await fetch(target, {
                ...request,
                signal: abortController?.controller.signal
            })
            if (errorStatusCodes.includes(res.status)) throw (res.status)
            const json = await res.json()
            setResponse({
                data: json,
                status: {
                    code: res.status
                }
            })
            requestComplete()
        } catch (error: any) {
            if (error === "target_change") return
            setResponse({
                data: undefined,
                status: {
                    code: isString(error) || isNumber(error) ? error : "Unknown error"
                }
            })
            requestComplete()
        }
    }

    useEffect(() => {
        setRequest()
        if (!abortController) return
        ref.current = new HandlerSideEffectAbortController(abortController)
        ref.current.addListener()
        ref.current.setTimeout()
        return () => {
            if (ref.current) {
                ref.current.abort()
                ref.current.clearTimeout()
                ref.current.removeListener()
            }
        }
    }, [target])


    return {
        response,
        isLoading
    }

}

export default useFetch