import { useDispatch } from "@/store"
import { ShopcartProductSchema } from "clothing-store-shared/schema"
import useShopcartFetch from "."

const usePatchShopcartProductQuantity = () => {
    const dispatch = useDispatch()
    return useShopcartFetch<ShopcartProductSchema.BaseInShopcart>({
        method: "PATCH",
        onSuccess: ({ result }) => {
            const { id, quantity } = result.data
            dispatch(({ shopcart }) => shopcart.changeQuantity({
                id,
                quantity: quantity
            }))
        }
    })
}

export default usePatchShopcartProductQuantity