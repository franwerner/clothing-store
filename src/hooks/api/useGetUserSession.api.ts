import { UserSchema } from "clothing-store-shared/schema"
import useFetchCustom from "../useFetchCustom.hooks"
import { useDispatch } from "@/store"

const useGetUserSession = () => {

    const dispatch = useDispatch()

    const res = useFetchCustom<UserSchema.FormatUser>({
        target: "/users/account",
        method: "GET",
        onSuccess: ({ result }) => {
            if (!result.data) return
            dispatch(({ user }) => user.set(result.data!))
        }

    })

    return res

}


export default useGetUserSession