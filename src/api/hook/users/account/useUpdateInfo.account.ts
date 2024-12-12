import { useAlertContext } from "@/components/AlertGlobal"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"
import { UserSchema } from "clothing-store-shared/schema"

type UpdateInfo = Omit<UserSchema.UpdateInfo, "user_id">
const useUpdateInfoUser = (props: UpdateInfo) => {

    const alertHandler = useAlertContext()
    const dispatch = useDispatch()

    return useFetchCustom<any, any, UpdateInfo>({
        target: "/users/account/update/info",
        body: props,
        onSuccess: ({ result }) => {
            alertHandler({ color: "success", text: result.message })
            dispatch(({ user }) => user.update(props)) //Quitar la password.
        }
    })
}

export default useUpdateInfoUser