import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import router from "@/router"

const usePostPasswordReset = ({ password, token }: { password: string, token: string }) => {

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
            alertHandler({ color: "success", description: message })
        }
    })
}

export default usePostPasswordReset