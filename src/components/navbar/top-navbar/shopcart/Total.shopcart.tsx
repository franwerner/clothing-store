import transformToCurrency from "@/helper/transformToCurrency.helper";
import { Progress } from "@nextui-org/react";

interface TotalShopcartProps {
    subtotal: number,

}

const ShopCartTotal = ({ subtotal }: TotalShopcartProps) => {

    const shipping = 3000
    const freeShipping = 10000

    const calculateFreeShipping = (freeShipping - subtotal) < 0 ? 0 : freeShipping - subtotal

    const isPaidShipping = calculateFreeShipping > 0 ? shipping : 0

    return (
        <section
            id="shopcart-total"
            className="flex flex-col w-full  items-center border-b-2"
        >
            <Progress
                label="none"
                size="md"
                value={subtotal}
                maxValue={freeShipping}
                classNames={{
                    indicator: "bg-default-500",
                    label: "hidden"
                }}
                formatOptions={{ style: "currency", currency: "ARS" }}
            />
            <p className="text-sm p-2">
                !Estas a <span className="text-default-900 font-bold">{transformToCurrency(calculateFreeShipping, "ARS")}
                </span> de recibir el <span className="font-bold">envio gratis</span>!
            </p>

            <div className="flex flex-col w-full items-end text-default-900 text-md font-bold gap-2 p-1">
                <p className=" text-[14px] text-end">
                    Envio : <span className="font-medium">{transformToCurrency(isPaidShipping, "ARS")}</span>
                </p>
                <p className="text-[15px] text-end">
                    Subtotal (sin envio) : <span className="font-medium ">{transformToCurrency(subtotal, "ARS")}</span>
                </p>
                <p className="text-[16px] text-end">
                    Total  : <span className="font-medium text-[16px]">{transformToCurrency(isPaidShipping + subtotal, "ARS")}</span>
                </p>
            </div>
        </section>
    );
};

export default ShopCartTotal;