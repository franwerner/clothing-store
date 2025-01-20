import { ShopcartProductSchema } from "clothing-store-shared/schema"

const calculateShopCart = ({ freeShipping, shipping }: Shipping, products?: Array<ShopcartProductSchema.BaseInShopcart>) => {
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