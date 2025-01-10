import { useAlertContext } from "@/components/AlertGlobal"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"

const useRequestPasswordReset  = (email: string) => {

    const alertHander = useAlertContext()

    return useFetchCustom({
        target: "/users/account/reset/password",
        method: "POST",
        body: {
            email
        },
        onFailed: ({ result_error }) => {
            const { code, message } = result_error
            if (code === "email_not_found") {
                alertHander({ severity: "danger", text: message })
            }
        },
        onSuccess:({result}) => {
            const {message} = result
           alertHander({severity : "success",text : message})
        }
    })
}

export default useRequestPasswordReset