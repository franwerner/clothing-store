import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import useResetStore from "@/hooks/useResetStore.hooks"
import router from "@/router"
import localStorageHandler from "@/utils/localStorageHandler.utilts"


const useGetLogout = () => {

    const alertHandler = useAlertContext()
    const resetStore = useResetStore()
    const res = useFetchCustom({
        target: "/users/session/logout",
        method: "GET",
        onSuccess: ({ result }) => {
            resetStore()
            router.navigate("/cuenta/ingresar")
            localStorageHandler.removeItem("userHasLoggedIn")
            alertHandler({ color: "success", description: result.message })
        }

    })

    return res
}


export default useGetLogout