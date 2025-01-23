import MercadoPagoSVG from "@/components/MecadoPagoSVG";
import { Radio, RadioGroup } from "@nextui-org/react";

const PaymentMethods = () => {
    return (
        <section className="py-4">
            <div className="border-b border-b-default-400 pb-2 flex mb-4 items-center gap-3 text-[18px]">
                <span className="material-symbols-outlined text-[30px]">
                    credit_card
                </span>
                <h2 className="font-medium uppercase font-oswald">
                    Métodos de pago
                </h2>
            </div>
            <RadioGroup
                defaultValue={"mercadopago"}
                className="p-2">
                <Radio
                    size="sm"
                    color="default"
                    className="flex"
                    classNames={{
                        label: " grid grid-cols-2 p-1  w-full  min-w-full",
                        base: " min-w-full border-black",
                        control : "bg-black p-[4px]",
                        labelWrapper: "w-full",
                    }} value="mercadopago">
                    <MercadoPagoSVG />
                </Radio>
            </RadioGroup>
        </section>
    );
};

export default PaymentMethods
