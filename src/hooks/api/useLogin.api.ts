import router from "@/router"
import { useDispatch } from "@/store"
import { UserSchema } from "clothing-store-shared/schema"
import useFetchCustom from "../useFetchCustom.hooks"
import { isErrorResponse, isSuccessResponse, isWriteOperationErrorResponse, isZodErrorResponse } from "@/utils/verifyResponsesData.utilts"
import { isError } from "util"

interface UseLoginFormProps {
    email: string,
    password: string
}

const useLogin = ({ email, password }: UseLoginFormProps) => {

    const dispatch = useDispatch()

    const res = useFetchCustom<UserSchema.FormatUser,any,UserSchema.FormatUser>({
        target: "/users/login",
        method: "POST",
        body: {
            email,
            password
        },
        onSuccess: (response) => {
            const { data } = response.result
            if (!data) return
            dispatch(({ user }) => user.set(data))
            if (!data.email_confirmed) {
                router.navigate("/cuenta/confirmacion")
            } else {
                router.navigate("/")
            }

        },
    })

    return res
}

export default useLogin