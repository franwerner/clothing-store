import { useSelector } from "@/store";
import transformToCurrency from "@/utils/transformToCurrency.utils";
import { Progress } from "@nextui-org/react";
import { ShopcartProductSchema } from "clothing-store-shared/schema";
import { Shopcart } from "clothing-store-shared/types";


const calculateShopCart = ({ cost_based_shipping = 0, min_free_shipping = 0 }: Partial<Shopcart["shipping"]>, products: Array<ShopcartProductSchema.BaseInShopcart>) => {
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


const ShopcartTotal = () => {

    const products = useSelector(({ shopcart }) => shopcart.products) || []
    const shipping = useSelector(({ shopcart }) => shopcart.shipping)

    const { freeShippingAmountNeeded, subTotal, total } = calculateShopCart(shipping || {}, products)

    const cost = shipping?.cost_based_shipping ?? 0
    const free_shipping = shipping?.min_free_shipping ?? 0
    return (
        <section
            id="shopcart-total"
            className="flex flex-col w-full  pb-5 items-center "
        >
            <Progress
                label="none"
                size="md"
                value={subTotal}
                maxValue={free_shipping}
                classNames={{
                    indicator: `${freeShippingAmountNeeded ? "bg-secondary-300" : "bg-success-300"}`,
                    label: "hidden",
                }}
                formatOptions={{ style: "currency", currency: "ARS" }}
            />
            <div >
                !Estas a
                <span className="font-semibold mx-1  underline ">{transformToCurrency(freeShippingAmountNeeded, "ARS")}</span>
                de recibir el
                <span className="font-bold text-center overflow-hidden text-ellipsis text-sm  uppercase"> envio gratis!</span>
            </div>
            <section className="w-full h-full grid  border-b-0">
                <div className="flex justify-between items-center border-b border-default-200 p-4">
                    <p className="font-semibold">Envio</p>
                    <span className="font-medium">{transformToCurrency(freeShippingAmountNeeded ? cost : -cost)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-default-200 p-4">
                    <p className="font-semibold">Subtotal</p>
                    <span className="font-medium">{transformToCurrency(subTotal, "ARS")}</span>
                </div>
                <div className="flex justify-between  items-center p-4">
                    <p className="font-semibold">Total</p>
                    <span className="font-medium">{transformToCurrency(total, "ARS")}</span>
                </div>
            </section>
        </section>
    );
};

export default ShopcartTotal