import { useDispatch } from "@/store"
import useShopcartFetch from "."
import { DatabaseKeySchema } from "clothing-store-shared/schema"

const useDeleteShopcartProduct = (id: DatabaseKeySchema) => {
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