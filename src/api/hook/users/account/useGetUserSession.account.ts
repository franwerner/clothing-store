import { useDispatch } from "@/store"
import { UserSchema } from "clothing-store-shared/schema"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"

const useGetUserSession = () => {

    const dispatch = useDispatch()

    return useFetchCustom<UserSchema.FormatUser>({
        target: "/users/account",
        method: "GET",
        onSuccess: ({ result }) => {
            const { data } = result
            if (!data) return
            dispatch(({ user }) => user.set(data))
        },
    })
}


export default useGetUserSession