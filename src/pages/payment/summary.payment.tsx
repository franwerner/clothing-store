import ActionButton from "@/components/ActionButton";
import Shopcart from "@/containers/shopcart";

const PaymentSummary = () => {

    return (
        <section className="overflow-hidden flex flex-col gap-4 ">
            <div className="flex border-b border-b-default-400  pb-2  items-center gap-3 text-[18px]">
                <span className="material-symbols-outlined text-[30px]">
                    receipt_long
                </span>
                <h2 className="font-medium uppercase font-oswald">
                    Resumen
                </h2>
            </div>
            <Shopcart className=" p-1 [&_#shopcart-products]:h-[40dvh]  border border-default-100 shadow-md rounded-md" />
            <ActionButton
                onPress={() => {
                }}
                className="!min-w-full">
                Realizar pedido
            </ActionButton>
        </section>
    );
};

export default PaymentSummary