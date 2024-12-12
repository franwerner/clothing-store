import { UserSchema } from "clothing-store-shared/schema"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useAlertContext } from "@/components/AlertGlobal"
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
            if (e.result.code === "limit_account_per_ip") {
                alertHandler({ severity: "warning", text: e.result.message })
            }
        },
        onSuccess: ({ result }) => {
            const { data, message } = result
            if (!data) return
            localStorageHandler.setItem({ userHasLoggedIn: true })
            alertHandler({ severity: "success", text: message })
            dispatch(({ user }) => user.set(data))
            router.navigate("/cuenta/reenviar")
        }
    })

    return res
}


export default useRegister