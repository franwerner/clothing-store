
import classNames from "classnames"
import { motion } from "framer-motion"
import { memo } from "react"
import iconTracking from "../constant/iconTracking.constant"
import adaptDateFormat from "../utils/adaptDateFormat.utilts"
import checkOrderProgress from "../utils/checkOrderProgress.utils"
import colorTracking from "../constant/colorTracking.constant"

type OrderProgressType = "payment" | "store" | "shipping" | "client"

interface OrderProgress {
    type: OrderProgressType
    status: "rejected" | "pending" | "completed"
    status_code: string
    description: string
}

const translateType: Record<OrderProgressType, string> = {
    payment: "Pago",
    store: "Tienda",
    shipping: "Envio",
    client: "Cliente"
}

const Items = ({ status, description, index, isCurrentTraccking, type }: OrderProgress & { index: number, isCurrentTraccking: boolean }) => {
    const tType = translateType[type]
    const icon = isCurrentTraccking ? iconTracking[status] : iconTracking["pending"]
    const color = isCurrentTraccking ? colorTracking[status] : colorTracking["pending"]

    return (
        <li className="relative flex gap-x-5 items-start">
            <motion.div
                transition={{
                    duration: 0.4,
                    delay: 0.4 * index,
                }}
                initial={{
                    x: -100,
                    opacity: 0
                }}
                animate={{
                    x: 0,
                    opacity: 1
                }}
                className={classNames(
                    "flex flex-col flex-1 items-end",
                    {
                        "*:hidden": !isCurrentTraccking || status === "pending"
                    }
                )}>
                <span className=" font-bold text-sm text-end">{adaptDateFormat(new Date())}</span>
                <span className="text-sm text-default-500 ">08:20 AM</span>
            </motion.div>

            <div className="flex overflow-hidden flex-col h-full items-center ">
                <motion.span
                    initial={{
                        backgroundColor: "#ededed",
                    }}
                    transition={{
                        duration: 0.4,
                        delay: 0.4 * index
                    }}
                    animate={{
                        backgroundColor: color
                    }}
                    className="relative h-[32px] text-white text-[21px] p-[3px] flex justify-center items-center  w-[32px] rounded-full material-symbols-outlined z-10">
                    {icon}
                </motion.span>
                {index !== 3 && <div className="flex flex-1 relative">
                    <motion.span
                        transition={{
                            duration: 0.4,
                            delay: 0.4 * index,
                        }}
                        initial={{
                            y: isCurrentTraccking ? -200 : 0
                        }}
                        animate={{
                            y: 0
                        }}
                        style={{
                            backgroundColor: color,
                        }}
                        className="w-[5px] absolute h-full" />
                    <span
                        style={{ backgroundColor: "#ededed" }}
                        className="w-[5px] flex-1 min-h-[40px]"
                    />
                </div>
                }
            </div>
            <motion.div
                transition={{
                    duration: 0.4,
                    delay: 0.4 * index,
                }}
                initial={{
                    x: 100,
                    opacity: 0
                }}
                animate={{
                    x: 0,
                    opacity: 1
                }}
                className="flex-1 flex flex-col">
                <span className="font-bold text-sm">{tType}</span>
                <span className="text-default-500 break-all text-sm">{description}</span>
            </motion.div>
        </li>
    )
}

const OrderProgressMocks: Array<OrderProgress> = [
    {
        type: "payment",
        status: "completed",
        description: "Pago completado",
        status_code: "is_reject_not_ammout",
    },
    {
        type: "store",
        status: "completed",
        description: "Orden preparada",
        status_code: "is_pending",
    },
    {
        type: "shipping",
        status: "rejected",
        description: "Envio cancelado asdsa sadasdsads a asd asds asdasd asdasdasdsad asds asdasdsadasd asdasdasdas asdasddsdsdsasdsadsadsasdasdsdds ",
        status_code: "is_reject_ads",
    },
    {
        type: "client",
        status: "completed",
        description: "Orden no llego a destino",
        status_code: "completed",
    },
]

const OrderTracking = memo(() => {


    return (
        <section
            id="order-tracking"
            className="flex rounded-lg shadow-md p-4 mt-4 min-h-[300px] bg-white justify-center">
            <ul className="flex flex-col">
                {
                    OrderProgressMocks.map((i, index) => <Items
                        key={i.type}
                        isCurrentTraccking={checkOrderProgress(index, OrderProgressMocks)}
                        index={index} {...i}
                    />)
                }
            </ul>
        </section>
    )
})


export default OrderTracking