import { useDispatch } from "@/store"
import { UserSchema } from "clothing-store-shared/schema"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"

const useGetUserSession = () => {

    const dispatch = useDispatch()

    return useFetchCustom<{
        user_info: UserSchema.FormatUser,
        edit_expiration?: number
    }>({
        target: "/users/session",
        method: "GET",
        onSuccess: ({ result }) => {
            const data = result.data
            dispatch(({ user }) => user.set(data.user_info))
            dispatch(({ user }) => user.setEditExpiration(data.edit_expiration))
        },
    })
}


export default useGetUserSession