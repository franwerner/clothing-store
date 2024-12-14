import { useAlertContext } from "@/components/AlertGlobal"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"
import { UserSchema } from "clothing-store-shared/schema"

type UpdateInfo = Omit<UserSchema.UpdateInfo, "user_id">
const useUpdateInfoUser = (props: UpdateInfo = {}) => {

    const alertHandler = useAlertContext()
    const dispatch = useDispatch()

    return useFetchCustom<UserSchema.FormatUser, any, UpdateInfo>({
        target: "/users/account/update/info",
        method: "POST",
        body: props,
        onFailed: ({ result }) => {
            const { code, message } = result
            if (code === "not_edit_authorized") {
                alertHandler({ color: "danger", text: message })
                dispatch(({ user }) => user.setEditAuth({ expired_at: 0, isAuthorized: false }))
            }
        },
        onSuccess: ({ result }) => {
            const { data, message } = result
            alertHandler({ color: "success", text: message })
            dispatch(({ user }) => user.update(data))
        }
    })
}

export default useUpdateInfoUser