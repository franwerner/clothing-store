import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"

const useShopcartRemoveProduct = (id: string) => {

    const dispatch = useDispatch()

    return useFetchCustom({
        target: "/shopcart",
        method: "DELETE",
        body: {
            id
        },
        onSuccess: () => {
            dispatch(({ shopcart }) => shopcart.remove(id))
        }
    })
}

export default useShopcartRemoveProduct