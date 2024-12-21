import transformToCurrency from "@/utils/transformToCurrency.utils"
import { Image } from "@nextui-org/react"
import classNames from "classnames"
import { AnimatePresence, motion } from "framer-motion"
import calculateOrder from "../utils/calculateOrder.utils"
import { useState } from "react"

interface ProductOrder {
    user_purchase_id: number
    name: string
    discount: number
    price: number
    quantity: number
    size: string
    color: string
    url: string
}

const test = [
    {
        user_purchase_id: 1,
        name: "Gorra truckker asdsadsad asdsad sadas dsad",
        discount: 10,
        price: 30000,
        quantity: 2,
        size: "M",
        color: "Negro",
        url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp"
    },
    {
        user_purchase_id: 2,
        name: "Camiseta deportiva Dry Fit",
        discount: 15,
        price: 25000,
        quantity: 1,
        size: "L",
        color: "Azul",
        url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp"
    },
    {
        user_purchase_id: 3,
        name: "Zapatillas running Pro",
        discount: 20,
        price: 50000,
        quantity: 1,
        size: "42",
        color: "Gris",
        url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp"
    },
    {
        user_purchase_id: 4,
        name: "Pantalón deportivo Flex",
        discount: 5,
        price: 40000,
        quantity: 1,
        size: "XL",
        color: "Negro",
        url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp"
    },
    {
        user_purchase_id: 5,
        name: "Mochila urbana Classic",
        discount: 10,
        price: 35000,
        quantity: 1,
        size: "Único",
        color: "Rojo",
        url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp"
    },
    {
        user_purchase_id: 6,
        name: "Reloj digital Sport",
        discount: 0,
        price: 45000,
        quantity: 1,
        size: "Único",
        color: "Negro",
        url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp"
    }
];

const Product = ({ name, discount, price, url, quantity, color, size }: ProductOrder) => {

    const isDiscount = discount > 0

    return (
        <motion.li
            initial={{
                opacity: 0,
                x: -100
            }}
            exit={{
                opacity: 0,
            }}
            viewport={{ once: true }}
            transition={{
                delay: 0.2,
                duration: 0.2,
                repeat: 0
            }}
            whileInView={{
                opacity: 1,
                x: 0
            }}
            className=" flex max-sm:flex-col  border-b-1 last:border-0 first:border-t-1 p-2 gap-x-1 max-sm:items-center justify-between">
            <Image
                classNames={{ img: "object-contain max-h-[100px]", wrapper: "self-center" }}
                src={url} />
            <div className="sm:ms-1 max-sm:order-3 flex-1">
                <h4 className="font-semibold break-all max-sm:text-center text-md text-default-800">{name}</h4>
                <div className="max-sm:flex justify-center w-full  flex-wrap gap-1">
                    <h4 className="text-sm text-default-500">
                        Color: <span className="text-default-700 font-semibold uppercase">{color}</span>
                    </h4>
                    <h4 className="text-sm text-default-500">
                        Tamaño: <span className="text-default-700 font-semibold uppercase">{size}</span>
                    </h4>
                    <h4 className="text-sm text-default-500">
                        Cantidad: <span className="text-default-700 font-semibold uppercase">{quantity}</span>
                    </h4>
                </div>
            </div>
            <div className="flex max-sm:flex-col gap-x-2">
                <h4 className={classNames("font-bold max-sm:order-1", { "text-danger-600": isDiscount })}>
                    {transformToCurrency((price * (1 - discount / 100)) * quantity, "ARS")}
                </h4>
                {isDiscount && <h4 className="line-through text-sm">{transformToCurrency(price * quantity, "ARS")}</h4>}
            </div>
        </motion.li >
    )
}

const OrderProducts = () => {

    const { total_quantity, total_payment } = calculateOrder(test)

    const [show, setShow] = useState(true)


    return (
        <section
            id="order-products"
            className="rounded-lg w-full p-4 shadow-md relative bg-white mt-4">
                
            <span
                onClick={() => setShow(prev => !prev)}
                className={`material-symbols-outlined absolute select-none hover:bg-default-100 rounded-full top-1 p-1 left-1 cursor-pointer text-[26px] transform transition-all duration-300 ${show ? "rotate-180" : "rotate-0"
                    }`}
            >
                keyboard_arrow_up
            </span>
            
            <div className="bg-white flex p-4 pb-1 mt-1  justify-between">
                <div className="overflow-hidden grid place-content-end">
                    <p className="text-default-400 text-xs">Productos</p>
                    <h4 className="font-semibold text-lg truncate">{total_quantity}u</h4>
                </div>
                <div className="overflow-hidden grid place-content-end">
                    <p className="text-default-400  text-xs text-end">Subtotal</p>
                    <h4 className="font-semibold  text-lg truncate">{transformToCurrency(total_payment, "ARS")}</h4>
                </div>
            </div>

            <AnimatePresence>
                {
                    show && <motion.ul
                        initial={{
                            height: 0,
                        }}
                        animate={{
                            height: "auto"
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                        exit={{
                            height: 0,
                        }}
                        className="grid gap-2">
                        {
                            test.map((i) => <Product key={i.user_purchase_id} {...i} />)
                        }
                    </motion.ul>
                }
            </AnimatePresence>
        </section>
    )
}

export default OrderProducts



