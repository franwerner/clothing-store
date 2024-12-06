import { UserSchema } from "clothing-store-shared/schema"
import useFetchCustom from "../useFetchCustom.hooks"
import { useAlertContext } from "@/components/AlertGlobal"
import router from "@/router"
import { useDispatch } from "@/store"

const useRegister = (props: Omit<UserSchema.Insert, "ip" | "permission">) => {

    const alertHandler = useAlertContext()

    const dispatch = useDispatch()

    const res = useFetchCustom<UserSchema.FormatUser, any, UserSchema.Insert>({
        target: "users/register",
        method: "POST",
        body: props,
        onFailed: (e) => {
            if (e.result.code === "limit_account_per_ip") {
                alertHandler({ severity: "warning", title: e.result.message })
            }
        },
        onSuccess: (e) => {
            if (!e.result.data) return
            alertHandler({ severity: "success", text: e.result.message })
            dispatch(({ user }) => user.set(e.result.data))
            router.navigate("/cuenta/confirmacion")
        }
    })

    return res
}


export default useRegister