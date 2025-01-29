import { useDispatch } from "@/store"
import useShopcartFetch from "."

const useDeleteShopcartProduct = (id: string) => {
    const dispatch = useDispatch()
    return useShopcartFetch({
        method: "DELETE",
        body: {
            id
        },
        onSuccess: () => {
            dispatch(({ shopcart }) => shopcart.removeProduct(id))
        }
    })

}

export default useDeleteShopcartProduct