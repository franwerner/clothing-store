import { useSelector } from "@/store";
import transformToCurrency from "@/utils/transformToCurrency.utils";
import { Progress } from "@nextui-org/react";
import { ShopcartProductSchema } from "clothing-store-shared/schema";

const shippingMock = {
    freeShipping: 100000,
    shipping: 7000
}
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


const ShopcartTotal = () => {

    const products = useSelector(({ shopcart }) => shopcart.products)

    const { freeShippingAmountNeeded, subTotal, total } = calculateShopCart(shippingMock, products)

    return (
        <section
            id="shopcart-total"
            className="flex flex-col w-full  pb-5 items-center "
        >
            <Progress
                label="none"
                size="md"
                value={subTotal}
                maxValue={shippingMock.freeShipping}
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
                    <span className="font-medium">{transformToCurrency(freeShippingAmountNeeded ? 7000 : -7000)}</span>
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