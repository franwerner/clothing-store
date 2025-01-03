import ActionButton from "@/components/ActionButton"
import router from "@/router"
import transformToCurrency from "@/utils/transformToCurrency.utils"
import { Card, CardBody, CardFooter, CardHeader, Link } from "@nextui-org/react"
import adaptDateFormat from "./utils/adaptDateFormat.utilts"
import fillOrderWithZeros from "./utils/fillOrderWithZeros.utils"
import colorTracking from "./constant/colorTracking.constant"
import checkOrderProgress from "./utils/checkOrderProgress.utils"
import iconTracking from "./constant/iconTracking.constant"

const orderList = [
    {
        user_purchase_id: 1,
        tracking: [
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
                status: "pending",
                description: "Envio cancelado asdsa sadasdsads a asd asds asdasd asdasdasdsad asds asdasdsadasd asdasdasdas asdasddsdsdsasdsadsadsasdasdsdds ",
                status_code: "is_reject_ads",
            },
            {
                type: "client",
                status: "completed",
                description: "Orden no llego a destino",
                status_code: "completed",
            },
        ],
        total_products_unity: 123,
        total: 9999
    },
    {
        user_purchase_id: 2,
        tracking: [
            {
                type: "payment",
                status: "completed",
                description: "Pago completado",
                status_code: "is_reject_not_ammout",
            },
            {
                type: "store",
                status: "rejected",
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
        ],
        total_products_unity: 123,
        total: 9999
    },
]

const OrderTracking = ({ isCurrentProgress, status, type, index }) => {

    const icon = isCurrentProgress ? iconTracking[status] : iconTracking["pending"]
    const color = isCurrentProgress ? colorTracking[status] : colorTracking["pending"]
    return (
        <div key={type} className="flex flex-1 last:max-w-min relative items-center gap-2">
            <span
                style={{
                    backgroundColor: color,
                }}
                className="material-symbols-outlined z-10  text-white p-[4px] px-[8px] rounded-full text-xl">
                {icon}
            </span>
            {
                index !== 3 && <span style={{ backgroundColor: color }} className="w-full absolute  h-[3px] ">

                </span>
            }
        </div>
    )
}

const Order = ({ user_purchase_id, tracking }) => {

    return (
        <Card
            as={"article"}
            className=" relative  w-full max-w-[350px] shadow-md">
            <CardHeader
                className="text-2xl p-1 px-3 border-b justify-between">
                <div className="leading-none">
                    <span className="text-default-400  text-[12px]">Orden</span>
                    <h2 className="text-lg font-bold"> #{fillOrderWithZeros(user_purchase_id)}</h2>
                </div>
                <div className="leading-none">
                    <span className="text-default-400 text-[12px]">Creación</span>
                    <h2 className="text-medium  font-semibold">{adaptDateFormat(new Date())}</h2>
                </div>
            </CardHeader>
            <CardBody className="flex-row justify-center py-6">
                {
                    tracking.map((i, index) => <OrderTracking isCurrentProgress={checkOrderProgress(index, tracking)} key={i.type} {...i} />)
                }
            </CardBody>
            <CardFooter className="border-t uppercase justify-between">
                <Link
                    onPress={() => router.navigate(user_purchase_id.toString())}
                    className=" font-semibold cursor-pointer text-default-800 hover:underline text-[14px]  m-0  rounded-lg">
                    Ver detalles
                </Link>
                <span className="bg-default-100 font-semibold text-[15px]  text-default-800 px-2 p-1 rounded-lg">
                    {transformToCurrency(123123, "ARS")}
                </span>
            </CardFooter>
        </Card>
    )
}

const OrdersList = () => {
    return (
        <section className="flex flex-wrap justify-center my-2 gap-4">
            {
                orderList.map(i => <Order key={i.user_purchase_id} {...i} />)
            }
        </section>
    )
}

export default OrdersList