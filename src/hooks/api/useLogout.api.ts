import router from "@/router"
import useFetchCustom from "../useFetchCustom.hooks"
import { useDispatch } from "@/store"


const useLogout = (user_id?: string | number) => {

    const dispatch = useDispatch()

    const res = useFetchCustom({
        target: "/users/logout",
        method: "GET",
        query: {
            user_id
        },
        onSuccess: () => {
            dispatch(({ user }) => user.remove())
            router.navigate("/cuenta?form=login")
        }

    })
 
    return res
}


export default useLogout