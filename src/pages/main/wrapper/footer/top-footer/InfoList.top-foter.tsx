import { useSelector } from "@/store"
import transformToCurrency from "@/utils/transformToCurrency.utils"

const infoList = [
    {
        icon: "credit_card",
        title: "Paga con tarjeta",
        subtitle: "Aceptamos todas las tarjetas de debito para tu comodidad."
    },
    {
        icon: "local_atm",
        title: "mercadopago",
        subtitle: "Realiza tus pagos de forma segura con la integración de Mercado Pago."
    },
];



const InfoList = () => {
    const min_free_shipping = useSelector(({ storeConfig }) => storeConfig.min_free_shipping)
    const item_info = {
        icon: "local_shipping",
        title: "Envío gratis",
        subtitle: `Disfruta del envío gratuito en compras mayores a ${transformToCurrency(min_free_shipping)}.`
    }
    return (
        <div className="md:flex justify-center items-center w-full py-10 px-2">
            {
                [...infoList, item_info].map(({ icon, title, subtitle }, index) =>
                    <div
                        key={index}
                        className={`flex flex-col justify-start items-center group flex-1 max-md:py-3 md:px-3 gap-1"`}
                    >
                        <div className="flex justify-center items-center gap-2 ">
                            <span className="material-symbols-outlined  text-[25px] ">
                                {icon}
                            </span>
                            <h3 className="text-[17px] font-oswald  text-default-700 font-semibold uppercase">{title}</h3>
                        </div>
                        <p className="text-[14px] text-center  font-light">{subtitle}</p>
                    </div>
                )
            }
        </div>
    )
}

export default InfoList