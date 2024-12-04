import router from "@/router"
import useFetchCustom from "../useFetchCustom.hooks"
import { useDispatch } from "@/store"


const useLogout = () => {

    const dispatch = useDispatch()

    const res = useFetchCustom({
        target: "/users/logout",
        method: "GET",
        onSuccess: () => {
            dispatch(({ user }) => user.remove())
            router.navigate("/cuenta?form=login")
        }

    })

    return res
}


export default useLogout