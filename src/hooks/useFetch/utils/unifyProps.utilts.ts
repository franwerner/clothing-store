import { FetchResponse, UseFetchProps, UseFetchPropsDynamic } from ".."

const unifyProps = <T, U>(props_static: UseFetchProps<T, U>, props_dinamic: UseFetchPropsDynamic<T, U>) => {
    const unify = { ...props_static }
    for (const k in props_dinamic) {
        const key = k as keyof UseFetchPropsDynamic<T, U>
        const value = props_dinamic[key]
        if (key === "onSuccess") {
            unify["onSuccess"] = (response: FetchResponse<T>) => {
                props_static[key]?.(response)
                props_dinamic[key]?.(response)
            }

        } else if (key === "onFailed") {
            unify["onFailed"] = (response: FetchResponse<U>) => {
                props_static[key]?.(response)
                props_dinamic[key]?.(response)
            }

        } else {
            unify[key] = value as any
        }
    }
    return unify
}

export {
    type UseFetchPropsDynamic
}


export default unifyProps