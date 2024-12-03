import useFetch, { UseFetchProps } from "./useFetch"

type Result<T = any> = {
    data: T
    message: string,
    code: string,
}

type UseFetchCustomResult<T = any> = Partial<Result<T>>

const useFetchCustom = <T = any>(props: UseFetchProps<UseFetchCustomResult<T>>) => {
    return useFetch<UseFetchCustomResult<T>>({
        basename: "/api",
        headers: {
            "Content-type": "application/json"
        },
        ...props
    })
}

export {
    type UseFetchCustomResult
}
export default useFetchCustom