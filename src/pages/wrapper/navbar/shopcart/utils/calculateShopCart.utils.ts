import Shipping from "@/interfaces/Shipping.interfaces"
import { ProductInShopcart } from "clothing-store-shared/types"


const calculateShopCart = ({ freeShipping, shipping }: Shipping, products?: Array<ProductInShopcart>) => {
    const total = (products || []).reduce((acc, { discount = 0, price, quantity }) => {
        const priceWithQuantity = price * quantity
        const calculateDiscount = priceWithQuantity * (discount / 100)
        return acc + (priceWithQuantity - calculateDiscount)
    }, 0)

    const isFreeShiping = freeShipping <= total

    return {
        total: isFreeShiping ? total : total + shipping,
        subTotal: total,
        freeShippingAmountNeeded: Math.max(freeShipping - total, 0),
    }
}



export default calculateShopCart