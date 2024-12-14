import router from "@/router"
import { useDispatch } from "@/store"
import localStorageHandler from "@/utils/localStorageHandler.utilts"
import { UserSchema } from "clothing-store-shared/schema"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useAlertContext } from "@/components/AlertGlobal"

interface UseLoginFormProps {
    email: string,
    password: string
}

const useLogin = ({ email, password }: UseLoginFormProps) => {

    const dispatch = useDispatch()
    const alertHandler = useAlertContext()

    const res = useFetchCustom<UserSchema.FormatUser, any, UserSchema.FormatUser>({
        target: "/users/login",
        method: "POST",
        body: {
            email,
            password
        },
        onSuccess: (response) => {
            localStorageHandler.setItem({ userHasLoggedIn: true })
            const { data } = response.result
            dispatch(({ user }) => user.set(data))
            if (!data.email_confirmed) {
                router.navigate("/cuenta/reenviar")
            } else {
                router.navigate("/")
            }
            alertHandler({color : "success",text:response.result.message})

        },
    })

    return res
}

export default useLogin