
import classNames from "classnames"
import { motion } from "framer-motion"
import { memo } from "react"

type OrderProgressType = "payment" | "store" | "shipping" | "client"

interface OrderProgress {
    type: OrderProgressType
    status: "rejected" | "pending" | "completed" | "in_process"
    status_code: string
    description: string
}

const colors = {
    "in_process": {
        primary: "#514cff",
        secondary: "#c2ccff"
    },
    "rejected": {
        primary: "#FF4C4C",
        secondary: "#ffc5c5"
    },
    "pending": {
        primary: "#dfdfdf",
        secondary: "#ededed"
    },
    "completed": {
        primary: "#38cc6f",
        secondary: "#c0f2d1"
    }
}

const daysToSpanish = {
    0: "Dom",
    1: "Lun",
    2: "Mar",
    3: "Mié",
    4: "Jue",
    5: "Vie",
    6: "Sáb"
}

const monthsToSpanish = {
    0: "Ene",
    1: "Feb",
    2: "Mar",
    3: "Abr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Ago",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dic"
}

const translateType: Record<OrderProgressType, string> = {
    payment: "Pago",
    store: "Tienda",
    shipping: "Envio",
    client: "Cliente"
}

const Items = ({ status, description, index, isCurrentTraccking, type }: OrderProgress & { index: number, isCurrentTraccking: boolean }) => {
    const tType = translateType[type]
    const { primary, secondary } = isCurrentTraccking ? colors[status] : colors["pending"]

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
                <span className=" font-bold text-sm text-end">04 Jan,20</span>
                <span className="text-sm text-default-500 ">08:20 AM</span>
            </motion.div>

            <div className="flex overflow-hidden flex-col h-full items-center ">
                <motion.span
                    initial={{
                        backgroundColor: "#dfdfdf",
                        border: "3px solid",
                        borderColor: "#ededed"
                    }}
                    transition={{
                        duration: 0.4,
                        delay: 0.4 * index
                    }}
                    animate={{
                        backgroundColor: primary,
                        border: "3px solid",
                        borderColor: secondary
                    }}
                    className="relative h-[24px] p-[3px] flex justify-center items-center  w-[24px] rounded-full z-10">
                </motion.span>
                {index !== 3 && <div className="flex flex-1 relative">
                    <motion.span
                        transition={{
                            duration: 0.4,
                            delay: 0.4 * index,
                        }}
                        initial={{
                            y: -200
                        }}
                        animate={{
                            y: 0
                        }}
                        style={{
                            backgroundColor: secondary
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
        status: "in_process",
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

    const checkOrderProgress = (index: number) => {
        return OrderProgressMocks.slice(0, index).every(i => i.status === "completed")
    }

    return (
        <section
            id="order-tracking"
            className="flex rounded-lg shadow-md p-4 mt-4 min-h-[300px] bg-white justify-center">
            <ul className="flex flex-col">
                {
                    OrderProgressMocks.map((i, index) => <Items
                        key={i.type}
                        isCurrentTraccking={checkOrderProgress(index)}
                        index={index} {...i}
                    />)
                }
            </ul>
        </section>
    )
})


export default OrderTracking