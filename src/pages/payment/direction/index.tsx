import DirectionForm from "./form.direction"

const PaymentDirection = () => {
    return (
        <section className="grid self-start gap-4">
            <div className="border-b border-b-default-400 pb-2 flex items-center gap-3 text-[18px]">
                <span className="material-symbols-outlined text-[30px]">
                    home
                </span>
                <h2 className="font-medium uppercase font-oswald">
                    Dirección de envío
                </h2>
            </div>
            <DirectionForm />
        </section>
    )
}

export default PaymentDirection