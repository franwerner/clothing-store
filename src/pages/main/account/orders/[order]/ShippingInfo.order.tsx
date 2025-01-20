import transformToCurrency from "@/utils/transformToCurrency.utils"

const details = [
    {label : "ID" ,value : "fc123asdk12012mñññlllda123mg"},
    { label: "Empresa", value: "Correo argentino" },
    { label: "Destino", value: "Urquiza 1280 dpto 1" },
    { label: "Envio", value: transformToCurrency(1231231, "ARS") },
];

const OrderShippingInfo = () => {


    return (
        <section id="order-shipping-info" className=" mt-4 shadow-md w-full bg-white overflow-hidden rounded-lg p-4 ">
            {details.map(({ label, value }) => (
                <div
                    key={label}
                    className="flex  justify-between  gap-2 p-3 border-b last:border-b-0 items-center">
                    <h4 className="font-bold ">{label}</h4>
                    <span className=" break-all text-end">{value}</span>
                </div>
            ))}
        </section>
    )
}

export default OrderShippingInfo