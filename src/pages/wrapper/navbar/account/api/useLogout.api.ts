import { useAlertContext } from "@/components/AlertGlobal"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import useResetStore from "@/hooks/useResetStore.hooks"
import router from "@/router"
import localStorageHandler from "@/utils/localStorageHandler.utilts"


const useLogout = () => {

    const alertHandler = useAlertContext()
    const resetStore = useResetStore()
    const res = useFetchCustom({
        target: "/users/logout",
        method: "GET",
        onSuccess: ({ result }) => {
            resetStore()
            router.navigate("/cuenta/ingresar")
            localStorageHandler.removeItem("userHasLoggedIn")
            alertHandler({ severity: "success", text: result.message })
        }

    })

    return res
}


export default useLogout