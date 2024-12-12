import { useAlertContext } from "@/components/AlertGlobal"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"

const useUpdateInfoUserAuth = (password:string) => {

    const alertHandler = useAlertContext()

    return useFetchCustom({
        target: "/users/account/update/info/auth",
        body: {
            password
        },
        onSuccess: ({ result }) => {
            alertHandler({ color: "success", text: result.message })
        }
    })
}

export default useUpdateInfoUserAuth