import Shipping from "@/interfaces/Shipping.interfaces";
import { useSelector } from "@/store";
import transformToCurrency from "@/utils/transformToCurrency.utils";
import { Progress } from "@nextui-org/react";
import calculateShopCart from "./utils/calculateShopCart.utils";

const shippingMock: Shipping = {
    freeShipping: 100000,
    shipping: 0
}

const ShopCartTotal = () => {
    
    const products = useSelector(({shopcart}) => shopcart.products)

    const { freeShippingAmountNeeded, subTotal, total } = calculateShopCart(shippingMock, products)

    return (
        <section
            id="shopcart-total"
            className="flex flex-col w-full pb-5 items-center "
        >
            <Progress
                label="none"
                size="md"
                value={subTotal}
                maxValue={shippingMock.freeShipping}
                classNames={{
                    indicator: "bg-secondary-300",
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
                    <span className="font-medium text-danger text-sm">*Se calcula al inciar la compra.</span>
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

export default ShopCartTotal;