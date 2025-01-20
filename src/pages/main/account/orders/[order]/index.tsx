import OrderProducts from "./Products.order"
import OrderTracking from "./Tracking.order"
import OrderShippingInfo from "./ShippingInfo.order"
import OrderDetails from "./Details.order"
import transformToCurrency from "@/utils/transformToCurrency.utils"
import withAuthorization from "@/pages/account/components/withAuthorization"

const Order = () => {

    return (
        <div className="flex flex-col overflow-hidden rounded-lg max-w-[700px] shadow-xl m-auto border mb-8 p-4  items-center ">
            <OrderDetails />
            <OrderTracking />
            <OrderShippingInfo />
            <OrderProducts />
            <div className="rounded-lg flex justify-between  w-full p-4 shadow-md bg-white mt-4">
                <h3 className="text-xl font-bold">Total</h3>
                <span className="text-lg">{transformToCurrency(4569, "ARS")}</span>
            </div>
        </div>
    )
}

export default withAuthorization(Order)
