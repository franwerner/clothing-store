import User from "@/interfaces/User.interface"
import router from "@/router"
import { useDispatch } from "@/store"
import useFetchCustom from "../useFetchCustom.hooks"

interface UseLoginFormProps {
    email: string,
    password: string
}

const useLogin = ({ email, password }: UseLoginFormProps) => {

    const dispatch = useDispatch()

    const res = useFetchCustom<User>({
        target: "/users/login",
        method: "POST",
        body: {
            email,
            password
        },
        onSuccess: ({ result }) => {
            if (!result.data) return
            dispatch(({ user }) => user.set(result.data!))
            router.navigate("/")
        },
    })

    return res
}

export default useLogin