import AnimatedTitle from "@/components/AnimatedTitle"
import OrdersList from "./List.orders"
import withAuthorization from "@/containers/hoc/withAuthorization.hoc"


const Orders = () => {

  return (
    <div className="w-full">
      <AnimatedTitle title="Mis Compras" />
      <OrdersList />
    </div>
  )
}

export default withAuthorization(Orders)