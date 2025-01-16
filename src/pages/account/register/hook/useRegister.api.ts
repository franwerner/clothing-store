import { UserSchema } from "clothing-store-shared/schema"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useAlertContext } from "@/containers/alert-global"
import router from "@/router"
import { useDispatch } from "@/store"
import localStorageHandler from "@/utils/localStorageHandler.utilts"

const useRegister = (props: Omit<UserSchema.Insert, "ip" | "permission">) => {

    const alertHandler = useAlertContext()

    const dispatch = useDispatch()

    const res = useFetchCustom<UserSchema.FormatUser, any, UserSchema.Insert>({
        target: "/users/register",
        method: "POST",
        body: props,
        onFailed: (e) => {
            if (e.result_error.code === "limit_account_per_ip") {
                alertHandler({ color: "warning", description: e.result_error.message })
            }
        },
        onSuccess: ({ result }) => {
            const { data, message } = result
            localStorageHandler.setItem({ userHasLoggedIn: true })
            alertHandler({ color: "success", description: message })
            dispatch(({ user }) => user.set(data))
            router.navigate("/cuenta/reenviar")
        }
    })

    return res
}


export default useRegister