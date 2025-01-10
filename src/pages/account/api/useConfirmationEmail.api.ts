import { useAlertContext } from "@/components/AlertGlobal"
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
                alertHandler({ severity: "info", text: message })
                router.navigate("/")
            }
        },
        onSuccess: ({ result }) => {
            const { message } = result
            alertHandler({ severity: "success", text: message })
            router.navigate("/")
        }
    })
}

export default useConfirmationEmail