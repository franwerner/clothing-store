import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"
import { StoreConfigSchema } from "clothing-store-shared/schema"

const useGetStoreConfig = () => {

    const dispatch = useDispatch()

    const alertHandler = useAlertContext()

    return useFetchCustom<StoreConfigSchema.Base, StoreConfigSchema.Base>({
        target: "store/config",
        method: "GET",
        onSuccess(response) {
            const { data } = response.result
            dispatch(({ storeConfig }) => storeConfig.set(data))
        },
        onFailed(response) {
            const { message } = response.result_error
            alertHandler({ color: "danger", description: message })
        },
    })
}

export default useGetStoreConfig