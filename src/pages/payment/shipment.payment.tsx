import transformToCurrency from "@/utils/transformToCurrency.utils"
import { Radio, RadioGroup } from "@nextui-org/react"

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
                <RadioGroup defaultValue={"house"} className="p-2">
                    <Radio 
                    size="sm"
                    color="default" 
                    classNames={{
                        label: " grid grid-cols-2 p-1  w-full  min-w-full",
                        base: " min-w-full border-black py-4",
                        control : "bg-black p-[4px]",
                        labelWrapper: "w-full",
                    }} value="house" >
                            <span className="font-semibold">{transformToCurrency(7000)}</span>
                            <p className="text-end text-sm font-medium">Envío a domicilio</p>
                    </Radio>
                </RadioGroup>
        </section>
    )
}

export default PaymentShipment