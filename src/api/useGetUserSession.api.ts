import { useDispatch } from "@/store"
import { UserSchema } from "clothing-store-shared/schema"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { EditAuth } from "clothing-store-shared/types"

const useGetUserSession = () => {

    const dispatch = useDispatch()

    return useFetchCustom<{
        user_info: UserSchema.FormatUser,
        edit_authorization?: EditAuth
    }>({
        target: "/users/account",
        method: "GET",
        onSuccess: ({ result }) => {
            const data = result.data
            dispatch(({ user }) => user.set(data.user_info))
            dispatch(({ user }) => user.setEditAuth(data.edit_authorization))
        },
    })
}


export default useGetUserSession