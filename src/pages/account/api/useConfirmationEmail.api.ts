import { useAlertContext } from "@/containers/alert-global"
import router from "@/router"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"

const useConfirmationEmail = (token: string) => {

    const alertHandler = useAlertContext()
    return useFetchCustom({
        target: "users/register/confirmation/",
        params: {
            token: token
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
            alertHandler({ color: "success", description: message })
            router.navigate("/")
        }
    })
}

export default useConfirmationEmail