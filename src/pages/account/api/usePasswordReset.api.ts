import { useAlertContext } from "@/components/AlertGlobal"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import router from "@/router"

const usePasswordReset = ({ password, token }: { password: string, token: string }) => {

    const alertHandler = useAlertContext()

    return useFetchCustom<any, any, { password: string }>({
        target: "/users/account/reset/password",
        method: "POST",
        body: {
            password
        },
        params: {
            token
        },
        onSuccess: ({ result }) => {
            const { message } = result
            router.navigate("/cuenta/ingresar")
            alertHandler({ severity: "success", text: message })
        },
        onFailed: ({ result_error }) => {
            const { code, message } = result_error
            if (code === "token_not_found") {
                alertHandler({ severity: "warning", text: message })
                router.navigate("/")
            }
        }
    })
}

export default usePasswordReset