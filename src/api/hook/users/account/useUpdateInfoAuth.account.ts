import { useAlertContext } from "@/components/AlertGlobal"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"
import { EditAuth } from "clothing-store-shared/types"

const useUpdateInfoUserAuth = (password: string = "") => {

    const alertHandler = useAlertContext()
    const dispatch = useDispatch()

    return useFetchCustom<EditAuth>({
        target: "/users/account/update/info/auth",
        method: "POST",
        body: {
            password
        },
        onSuccess: ({ result }) => {
            const { message, data } = result
            alertHandler({ color: "success", text: message })
            dispatch(({ user }) => user.setEditAuth(data))
        }
    })
}

export default useUpdateInfoUserAuth