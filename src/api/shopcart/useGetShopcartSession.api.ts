import { useDispatch } from "@/store"
import { Shopcart } from "clothing-store-shared/types"
import useShopcartFetch from "."

const useGetShopcartSession = () => {
    const dispatch = useDispatch()
    return useShopcartFetch<Shopcart>({
        method: "GET",
        onSuccess: ({ result }) => {
            dispatch(({ shopcart }) => shopcart.set(result.data))
        },
    })
}

export default useGetShopcartSession