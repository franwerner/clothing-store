import { UseFetch } from ".."


const unifyProps = <T, U>(props_static: UseFetch.Props<T, U>, props_dinamic: UseFetch.SetRequestProps<T, U>) => {
    const unify = { ...props_static }
    for (const k in props_dinamic) {
        const key = k as keyof UseFetch.SetRequestProps<T, U>
        const value = props_dinamic[key]
        if (key === "onSuccess") {
            unify["onSuccess"] = (response: UseFetch.Response<T>) => {
                props_static[key]?.(response)
                props_dinamic[key]?.(response)
            }

        } else if (key === "onFailed") {
            unify["onFailed"] = (response: UseFetch.Response<U>) => {
                props_static[key]?.(response)
                props_dinamic[key]?.(response)
            }

        } else {
            unify[key] = value as any
        }
    }
    return unify
}


export default unifyProps