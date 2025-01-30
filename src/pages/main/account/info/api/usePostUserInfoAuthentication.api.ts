import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"

const usePostUserInfoAuthorization = (password: string = "", action: () => void) => {

    const alertHandler = useAlertContext()
    const dispatch = useDispatch()

    return useFetchCustom<number>({
        target: "/users/info/update/auth",
        method: "POST",
        body: {
            password
        },
        onSuccess: ({ result }) => {
            const { message, data } = result
            alertHandler({ color: "success", description: message })
            dispatch(({ user }) => user.setEditExpiration(data))
            action()
        }
    })
}

export default usePostUserInfoAuthorization