import { useAlertContext } from "@/containers/alert-global"
import router from "@/router"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"

const useGetConfirmationEmail = (token: string | null) => {

    const alertHandler = useAlertContext()
    const dispatch = useDispatch()
    return useFetchCustom({
        target: "users/register/confirmation",
        params: {
            token
        },
        onFailed: ({ result_error }) => {
            const { code, message } = result_error
            if (code == "email_already_confirmed") {
                alertHandler({ color: "primary", description: message })
                router.navigate("/")
            }
        },
        onSuccess: ({ result }) => {
            const { message } = result
            dispatch(({ user }) => user.update({ email_confirmed: true }))
            alertHandler({ color: "success", description: message })
            router.navigate("/")
        }
    })
}

export default useGetConfirmationEmail