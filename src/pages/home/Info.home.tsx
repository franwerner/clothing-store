
const infoList = [
    {
        icon: "credit_card",
        title: "Paga con tarjeta",
        subtitle: "Aceptamos todas las tarjetas de debito para tu comodidad."
    },
    {
        icon: "local_shipping",
        title: "Envío gratis",
        subtitle: "Disfruta del envío gratuito en compras mayores a $9000,30."
    },
    {
        icon: "attach_money",
        title: "Descuento por transferencia",
        subtitle: "Obtén un 10% de descuento al pagar con transferencia."
    },
];


const HomeInfo = () => {
    return (
        <section
            className="md:flex justify-center py-14"
            id="info">
            {
                infoList.map(({ icon, title, subtitle }, index) =>
                    <div
                        key={index}
                        className={`flex justify-start items-center group flex-1 max-md:py-3 md:px-3 gap-1 ${index === infoList.length - 1 ? "" : "max-md:border-b md:border-r border-default-700"
                            }`}
                    >
                        <span className="material-symbols-outlined bg-default-200 rounded-full p-2 text-default-700 text-[35px] ">
                            {icon}
                        </span>
                        <div className="flex flex-col justify-center h-full">
                            <h3 className="text-[17px]  font-semibold uppercase">{title}</h3>
                            <p className="text-[15px]">{subtitle}</p>
                        </div>
                    </div>
                )
            }
        </section>
    );
};

export default HomeInfo