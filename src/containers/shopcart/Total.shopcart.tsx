import { useSelector } from "@/store";
import transformToCurrency from "@/utils/transformToCurrency.utils";
import { Progress } from "@nextui-org/react";
import calculateTotalShopcart from "./utils/calculateTotalShopcart.utils";


const ShopcartTotal = () => {

    const products = useSelector(({ shopcart }) => shopcart.products) || []
    const shipping = useSelector(({ shopcart }) => shopcart.shipping)
    const { min_free_shipping, cost_based_shipping } = useSelector(({ storeConfig }) => storeConfig)

    const cost = shipping.cost_based_shipping || cost_based_shipping
    const free_shipping = shipping.min_free_shipping || min_free_shipping 

    const { freeShippingAmountNeeded, subTotal, total } = calculateTotalShopcart({
        cost_based_shipping: cost,
        min_free_shipping: free_shipping
    }, products)

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
                    <span className="font-medium">{transformToCurrency(!freeShippingAmountNeeded && total ? -cost : cost)}</span>
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