import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"
import { UserSchema } from "clothing-store-shared/schema"

type UpdateInfo = Omit<UserSchema.Update, "user_id" | "guest_purchases_synced" | "email_confirmed">
const usePatchUserInfo = (props: UpdateInfo = {}) => {

    const alertHandler = useAlertContext()
    const dispatch = useDispatch()

    return useFetchCustom<UserSchema.FormatUser>({
        target: "/users/info/update",
        method: "PATCH",
        body: props,
        onFailed: ({ result_error }) => {
            const { code, message } = result_error
            if (code === "not_edit_authorized") {
                alertHandler({ color: "danger", description: message })
                dispatch(({ user }) => user.setEditAuth({ expired_at: 0, isAuthorized: false }))
            }
        },
        onSuccess: ({ result }) => {
            const { data, message } = result
            alertHandler({ color: "success", description: message })
            dispatch(({ user }) => user.update(data))
        }
    })
}

export default usePatchUserInfo