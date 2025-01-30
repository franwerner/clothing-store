import { useDispatch } from "@/store"
import { Shopcart } from "clothing-store-shared/types"
import useShopcartFetch from "."

const useGetShopcartSession = () => {
    const dispatch = useDispatch()
    return useShopcartFetch<Shopcart>({
        method: "GET",
        onSuccess: ({ result }) => {
            const { data } = result
            dispatch(({ shopcart }) => shopcart.set({
                ...data,
                expired_at: new Date(data.expired_at).getTime()
            }))
        },
    })
}

export default useGetShopcartSession