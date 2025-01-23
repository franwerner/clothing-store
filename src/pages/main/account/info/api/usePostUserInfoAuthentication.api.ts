import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"
import { EditAuth } from "clothing-store-shared/types"

const usePostUserInfoAuthentication = (password: string = "") => {

    const alertHandler = useAlertContext()
    const dispatch = useDispatch()

    return useFetchCustom<EditAuth>({
        target: "/users/info/update/auth",
        method: "POST",
        body: {
            password
        },
        onSuccess: ({ result }) => {
            const { message, data } = result
            alertHandler({ color: "success", description: message })
            dispatch(({ user }) => user.setEditAuth(data))
        }
    })
}

export default usePostUserInfoAuthentication