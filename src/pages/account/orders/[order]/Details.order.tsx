import fillOrderWithZeros from "../utils/fillOrderWithZeros.utils"

const OrderDetails = () => {

    return (
        <section
            id="order-details"
            className="justify-between items-center gap-x-2 rounded-lg  shadow-md bg-white mx-4 p-4 w-full flex ">
            <div>
                <span className="text-default-400  text-xs">Numero de orden</span>
                <h2 className="font-bold text-xl xl:text-2xl">#{fillOrderWithZeros(1)}</h2>
            </div>
            <div>
                <span className="text-default-400 text-end  text-xs">Creación</span>
                <h4 className="font-bold text-lg xl:text-xl">04 Jun, 2024</h4>
            </div>
        </section>
    )
}

export default OrderDetails