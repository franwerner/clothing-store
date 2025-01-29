import transformToCurrency from "@/utils/transformToCurrency.utils"
import { Checkbox } from "@nextui-org/react"

const PaymentShipment = () => {
    return (
        <section  >
            <div className="border-b border-b-default-400 pb-2 flex mb-4 items-center gap-3 text-[18px]">
                <span className="material-symbols-outlined text-[30px]">
                    delivery_truck_speed
                </span>
                <h2 className="font-medium uppercase font-oswald">
                    Métodos de envío
                </h2>
            </div>
            <Checkbox
                size="md"
                radius="full"
                color="secondary"
                classNames={{
                    base: "w-full p-4  max-w-[100%]",
                    label: "w-full flex before:hidden  justify-between",
                    wrapper : "after:bg-default-800"
                }}
                isSelected
            >
                    <span className="font-semibold ms-4 ">{transformToCurrency(7000)}</span>
                    <p className="text-end text-sm font-medium">Envío a domicilio</p>
            </Checkbox>
        </section>
    )
}

export default PaymentShipment