import { shopCartalTest1 } from "@/mocks/shopcart.mocks";
import calculatePercentage from "@/utils/calculatePercentage.utils";
import transformToCurrency from "@/utils/transformToCurrency.utils";
import { Progress } from "@nextui-org/react";
import { motion } from "framer-motion";

const ShopCartTotal = () => {

    const { freeShipping, shipping, subtotal } = shopCartalTest1

    const calculateFreeShipping = Math.max(freeShipping - subtotal, 0)

    const isPaidShipping = calculateFreeShipping > 0 ? shipping : 0

    const percentageDiference = calculatePercentage(freeShipping, subtotal)

    return (
        <section
            id="shopcart-total"
            className="flex flex-col w-full  items-center border-b-1"
        >
            <Progress
                label="none"
                size="md"
                value={subtotal}
                maxValue={freeShipping}
                classNames={{
                    indicator: "bg-default-700",
                    label: "hidden",
                }}
                formatOptions={{ style: "currency", currency: "ARS" }}
            />
            <div className="text-sm  block xs:flex font-medium gap-1 p-2 text-default-700">
                <p>
                    !Estas a <span className="text-default-600  font-semibold font-oswald">{transformToCurrency(calculateFreeShipping, "ARS")}
                    </span> de recibir el
                </p>
                <motion.div
                    transition={{
                        duration: Math.max(percentageDiference, 0) + 0.4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "backIn"
                    }}
                    animate={{
                        scale: [1, 1.1]
                    }}
                    className="font-bold text-center  uppercase ">
                    !envio gratis!
                </motion.div>
            </div>


            <div className="flex flex-col text-end font-oswalds w-full items-end uppercase text-default-700 text-md font-bold gap-2 p-1">
                <p className=" text-[14px]  ">
                    Envio : <span className="font-normal font-oswald">{transformToCurrency(isPaidShipping, "ARS")}</span>
                </p>
                <p className="text-[15px]  ">
                    Subtotal (sin envio) : <span className="font-normal font-oswald">{transformToCurrency(subtotal, "ARS")}</span>
                </p>
                <p className="text-[16px] ">
                    Total  : <span className="font-normal font-oswald text-[16px]">{transformToCurrency(isPaidShipping + subtotal, "ARS")}</span>
                </p>
            </div>
        </section>
    );
};

export default ShopCartTotal;