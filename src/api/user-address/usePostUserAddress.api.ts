import { useAlertContext } from "@/components/AlertGlobal"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"
import { UserAddresessSchema } from "clothing-store-shared/schema"

const usePostUserAddress = () => {

    const alertHandler = useAlertContext()
    const dispatch = useDispatch()

    const { setRequest, isLoading, response } = useFetchCustom<UserAddresessSchema.Base>({
        target: "/users/addresess",
        method: "POST",
        onSuccess : ({result}) => {
            const {message,data} = result
            alertHandler({color : "success",text : message })
            dispatch(({userAddress}) => userAddress.set(data) )
        }
    })

    return {
        setRequest,
        isLoading,
        response
    }

}

export default usePostUserAddress