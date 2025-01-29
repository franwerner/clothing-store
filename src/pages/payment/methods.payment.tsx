import MercadoPagoSVG from "@/components/MecadoPagoSVG";
import { Checkbox } from "@nextui-org/react";

const PaymentMethods = () => {
    return (
        <section >
            <div className="border-b border-b-default-400 pb-2 flex mb-4 items-center gap-3 text-[18px]">
                <span className="material-symbols-outlined text-[30px]">
                    credit_card
                </span>
                <h2 className="font-medium uppercase font-oswald">
                    Métodos de pago
                </h2>
            </div>

            <Checkbox
                size="md"
                radius="full"
                color="secondary"
                classNames={{
                    base: " p-4",
                    label: "  before:hidden ",
                    wrapper: "after:bg-default-800"
                }}
                isSelected
            >
                <MercadoPagoSVG />
            </Checkbox>
        </section>
    );
};

export default PaymentMethods
