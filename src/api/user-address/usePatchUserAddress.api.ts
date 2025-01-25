import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"
import { UserAddressesSchema } from "clothing-store-shared/schema"

const usePatchUserAddress = () => {
    const dispatch = useDispatch()
    const alertHandler = useAlertContext()
    const { setRequest, isLoading, response } = useFetchCustom<UserAddressesSchema.Update>({
        target: "/users/addresess",
        method: "PATCH",
        onSuccess({ result }) {
            const { data, message } = result
            dispatch(({ userAddress }) => userAddress.update(data))
            alertHandler({ color: "success", description: message })
        },
    })

    return {
        setRequest,
        isLoading,
        response
    }
}

export default usePatchUserAddress