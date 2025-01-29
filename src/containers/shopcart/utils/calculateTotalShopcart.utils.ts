import { ShopcartProductSchema } from "clothing-store-shared/schema"
import { Shopcart } from "clothing-store-shared/types"

const calculateTotalShopcart = ({ cost_based_shipping = 0, min_free_shipping = 0 }: Partial<Shopcart["shipping"]>, products: Array<ShopcartProductSchema.BaseInShopcart>) => {
    const total = products.reduce((acc, { discount = 0, price, quantity }) => {
        const priceWithQuantity = price * quantity
        const calculateDiscount = priceWithQuantity * (discount / 100)
        return acc + (priceWithQuantity - calculateDiscount)
    }, 0)
    const isFreeShiping = min_free_shipping <= total
    return {
        total: isFreeShiping ? total : total + cost_based_shipping,
        subTotal: total,
        freeShippingAmountNeeded: Math.max(min_free_shipping - total, 0),
    }
}
export default calculateTotalShopcart