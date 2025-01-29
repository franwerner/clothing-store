import ActionButton from "@/components/ActionButton"
import PageWrapper from "@/components/PageWrapper"
import router from "@/router"
import PaymentDirection from "./direction"
import PaymentSummary from "./Summary.payment"
import ShopcartExpiredCounter from "@/containers/ShopcartExpiredCounter.containers"
import PaymentShipment from "./Shipment.payment"
import PaymentMethods from "./Methods.payment"
import { useSelector } from "@/store"
import PaymentProvider from "./provider/Payment.provider"

const AccountOrderPayment = () => {

  const user_id = useSelector(({ user }) => user.info?.user_id)
  const isGuest = !user_id
  return (
    <PageWrapper className="flex flex-col  gap-10" isDisableBreadcrums>
      <header className="grid  gap-6">
        <div>
          <h1 className="font-oswald mb-1 text-4xl font-medium p-2">Mi pedido</h1>
          <p className="text-xs ">Por favor llene los campos listados a continuación y luego presione el botón realizar pedido.</p>
        </div>
        <ShopcartExpiredCounter />
        <div>
          <ActionButton
            onPress={() => router.navigate("/")}
            className="px-5 mb-3">
            <span className="material-symbols-outlined">
              chevron_left
            </span>
            Volver al inicio
          </ActionButton>
          {isGuest && <p className="text-xs cursor-pointer">Si ya tenés cuenta. Por favor ingresá desde el siguiente link.</p>}
        </div>
      </header>
      <main className="grid md:grid-cols-2  gap-6  items-start  p-2 ">
        <PaymentProvider>
          <div className="grid gap-6  h-full">
            <PaymentDirection />
            <PaymentShipment />
            <PaymentMethods />
          </div>
          <PaymentSummary />
        </PaymentProvider>
      </main>
    </PageWrapper>
  )

}

export default AccountOrderPayment