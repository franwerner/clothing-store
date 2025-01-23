import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import router from "@/router"

const usePostPasswordReset = ({ password, token = null }: { password: string, token: string | null }) => {

    const alertHandler = useAlertContext()

    return useFetchCustom<any, any, { password: string }>({
        target: "/users/info/reset/password",
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