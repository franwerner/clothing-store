import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { useDispatch } from "@/store"

const useShopcartRemoveProduct = (product_id:string) => {

    const dispatch = useDispatch()

    return useFetchCustom({
        target: "/shopcart",
        method: "DELETE",
        body: {
            product_id
        },
        onSuccess: () => {
            dispatch(({ shopcart }) => shopcart.remove(product_id))
        }
    })
}

export default useShopcartRemoveProduct