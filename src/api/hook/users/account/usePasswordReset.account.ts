import { useAlertContext } from "@/components/AlertGlobal"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import router from "@/router"

const usePasswordReset = ({ password, token }: { password: string, token: string }) => {

    const alertHander = useAlertContext()

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
            alertHander({ severity: "success", text: message })
        }
    })
}

export default usePasswordReset