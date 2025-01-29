import usePostOrder from "@/api/order/usePostOrder.api";
import usePostOrderGuest from "@/api/order/usePostOrderGuest.api";
import ActionButton from "@/components/ActionButton";
import Shopcart from "@/containers/shopcart";
import { usePaymentContext } from "./provider/Payment.provider";

const PaymentButton = () => {
    const { checkFormErrors, errors, isGuest, form } = usePaymentContext()
    const { department, email, lastname, locality, name, phone, postal_code, province, street, street_number } = form
    const order_address = {
        locality,
        phone,
        postal_code,
        province,
        street,
        department,
        street_number
    }
    const userOrder = usePostOrder(order_address)
    const guestOrder = usePostOrderGuest({
        order_address,
        order_guest: {
            email,
            lastname,
            name
        }
    })
    return (
        <ActionButton
            isDisabled={errors.hasError}
            isLoading={userOrder.isLoading || guestOrder.isLoading}
            onPress={() => {
                const { hasError, setErrors } = checkFormErrors()
                if (hasError) return setErrors()
                if (isGuest) {
                    guestOrder.setRequest()
                } else {
                    userOrder.setRequest()
                }
            }}
            className="!min-w-full">
            Realizar pedido
        </ActionButton>
    )
}
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
            <PaymentButton />
        </section>
    );
};

export default PaymentSummary