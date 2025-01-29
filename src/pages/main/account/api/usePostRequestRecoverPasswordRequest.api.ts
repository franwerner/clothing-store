import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"

const usePostRequestPasswordReset = (email: string) => {
    const alertHander = useAlertContext()
    return useFetchCustom({
        target: "/users/info/reset/password",
        method: "POST",
        body: {
            email
        },
        onSuccess: ({ result }) => {
            const { message } = result
            alertHander({ color: "success", description: message })
        },
    })
}

export default usePostRequestPasswordReset