import { shopCartalTest1 } from "@/mocks/shopcart.mocks";
import transformToCurrency from "@/utils/transformToCurrency.utils";
import { Progress } from "@nextui-org/react";

const ShopCartTotal = () => {

    const { freeShipping, shipping, subtotal } = shopCartalTest1

    const calculateFreeShipping = Math.max(freeShipping - subtotal, 0)

    const isPaidShipping = calculateFreeShipping > 0 ? shipping : 0

    return (
        <section
            id="shopcart-total"
            className="flex flex-col w-full pb-5  items-center "
        >
            <Progress
                label="none"
                size="md"
                value={subtotal}
                maxValue={freeShipping}
                classNames={{
                    indicator: "bg-secondary-300",
                    label: "hidden",
                }}
                formatOptions={{ style: "currency", currency: "ARS" }}
            />
            <p className="text-center py-2 ">
                !Estas a <span className="font-semibold  underline ">{transformToCurrency(calculateFreeShipping, "ARS")}
                </span> de recibir el  <span
                    className="font-bold text-center  uppercase ">
                    !envio gratis!
                </span>
               
            </p>

            <section className="w-full h-full grid  border-b-0">
                <div className="flex justify-between items-center border-b border-default-200 p-4">
                    <p className="font-semibold">Envio</p>
                    <span className="font-medium">{transformToCurrency(isPaidShipping, "ARS")}</span>
                </div>
                <div className="flex justify-between items-center border-b border-default-200 p-4">
                    <p className="font-semibold">Subtotal</p>
                    <span className="font-medium">{transformToCurrency(subtotal, "ARS")}</span>
                </div>
                <div className="flex justify-between  items-center p-4">
                    <p className="font-semibold">Total</p>
                    <span className="font-medium">{transformToCurrency(isPaidShipping + subtotal, "ARS")}</span>
                </div>
            </section>
        </section>
    );
};

export default ShopCartTotal;