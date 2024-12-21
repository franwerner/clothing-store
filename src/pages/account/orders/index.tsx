import { Card, CardBody, CardHeader } from "@nextui-org/react"
import fillOrderWithZeros from "./utils/fillOrderWithZeros.utils"
import router from "@/router"

const orderList = [
  {
    user_purchase_id: 1,
    current_tracking: {

    },
    total_products_unity: 123,
    total: 9999
  },
  {
    user_purchase_id: 5,
    current_tracking: {

    },
    total_products_unity: 123,
    total: 9999
  },
  {
    user_purchase_id: 3,
    current_tracking: {

    },
    total_products_unity: 123,
    total: 9999
  },
  {
    user_purchase_id: 2,
    current_tracking: {

    },
    total_products_unity: 123,
    total: 9999
  }
]


const Items = ({ user_purchase_id }) => {

  return (
    <>
      <Card
        as={"article"}
        className="h-[300px] relative hover:scale-100 scale-90 w-full max-w-[300px] shadow-md">
        <CardHeader
          as={"h2"}
          className="text-2xl font-semibold border-b text-end"
        >
          #{fillOrderWithZeros(user_purchase_id)}
        </CardHeader>
        <CardBody>

        </CardBody>
        {/* <span
          onClick={() => router.navigate(user_purchase_id.toString())}
          className="absolute h-full w-full z-10 "></span> */}
      </Card>
    </>
  )
}

const Orders = () => {

  return (
    <div className="flex flex-wrap justify-center mb-2 gap-2">
      {
        orderList.map(i => <Items key={i.user_purchase_id} {...i} />)
      }
    </div>
  )
}

export default Orders