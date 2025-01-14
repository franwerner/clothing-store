import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"
import { UserAddresessSchema } from "clothing-store-shared/schema"

const useGetUserAddress = () => {

    const dispatch = useDispatch()

    const { setRequest, isLoading, response } = useFetchCustom<UserAddresessSchema.Base>({
        target: "/users/addresess",
        method: "GET",
        onSuccess({ result }) {
            dispatch(({ userAddress }) => userAddress.set(result.data))
        },
    })

    return {
        isLoading,
        response,
        setRequest
    }

}

export default useGetUserAddress