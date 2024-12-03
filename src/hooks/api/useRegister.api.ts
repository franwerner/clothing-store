import User from "@/interfaces/User.interface"
import useFetchCustom from "../useFetchCustom.hooks"

interface useRegisterProps {

}

const useRegister = (props: useRegisterProps) => {

    const res = useFetchCustom<User>({
        target: "users/register",
        method: "POST",
        body: props
    })

    return res
}


export default useRegister