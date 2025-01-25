import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"
import { UserAddressesSchema } from "clothing-store-shared/schema"

const useGetUserAddress = () => {

    const dispatch = useDispatch()

    return useFetchCustom<UserAddressesSchema.Base>({
        target: "/users/addresess",
        method: "GET",
        onSuccess({ result }) {
            dispatch(({ userAddress }) => userAddress.set(result.data))
        },
    })


}

export default useGetUserAddress