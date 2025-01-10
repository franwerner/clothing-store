import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"
import { Shopcart } from "clothing-store-shared/types"

const useShopcartGetSession = () => {
    const dispatch = useDispatch()
    return useFetchCustom<Shopcart>({
        target: "/shopcart",
        method: "GET",
        onSuccess: ({ result }) => {
            dispatch(({ shopcart }) => shopcart.hydrateShopcart(result.data))
        }
    })
}


export default useShopcartGetSession