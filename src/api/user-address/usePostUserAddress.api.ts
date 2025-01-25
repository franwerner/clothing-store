import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"
import { UserAddressesSchema } from "clothing-store-shared/schema"

const usePostUserAddress = () => {

    const alertHandler = useAlertContext()
    const dispatch = useDispatch()

    const { setRequest, isLoading, response } = useFetchCustom<UserAddressesSchema.Base>({
        target: "/users/addresess",
        method: "POST",
        onSuccess : ({result}) => {
            const {message,data} = result
            alertHandler({color : "success",description : message })
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