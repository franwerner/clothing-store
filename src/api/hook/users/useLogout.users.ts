import router from "@/router"
import { useDispatch } from "@/store"
import { useAlertContext } from "@/components/AlertGlobal"
import localStorageHandler from "@/utils/localStorageHandler.utilts"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"


const useLogout = () => {

    const dispatch = useDispatch()
    const alertHandler = useAlertContext()

    const res = useFetchCustom({
        target: "/users/logout",
        method: "GET",
        onSuccess: ({ result }) => {
            dispatch(({ user }) => user.remove())
            router.navigate("/cuenta/ingresar")
            localStorageHandler.removeItem("userHasLoggedIn")
            alertHandler({ severity: "success", text: result.message })
        }

    })

    return res
}


export default useLogout