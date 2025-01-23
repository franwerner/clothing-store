import PageWrapper from "@/components/PageWrapper"
import router from "@/router"
import PaymentDirection from "./direction"
import PaymentSummary from "./summary.payment"
import ActionButton from "@/components/ActionButton"
import PaymentShipment from "./shipment.payment"
import PaymentMethods from "./methods.payment"

const AccountOrderPayment = () => {
  return (
    <PageWrapper className="flex flex-col gap-10" isDisableBreadcrums>
      <header className="grid  gap-6">
        <div>
          <h1 className="font-oswald mb-1 text-4xl font-medium p-2">Mi pedido</h1>
          <p className="text-xs ">Por favor llene los campos listados a continuación y luego presione el botón realizar pedido.</p>
        </div>
        <div>
          <ActionButton
            onPress={() => router.navigate("/")}
            className="px-5 mb-3">
            <span className="material-symbols-outlined">
              chevron_left
            </span>
            Volver al inicio
          </ActionButton>
          <p className="text-xs cursor-pointer">Si ya tenés cuenta. Por favor ingresá desde el siguiente link.</p>
        </div>
      </header>
      <main className="grid md:grid-cols-2 gap-4 ">
        <div className="grid gap-6">
          <PaymentDirection />
          <PaymentShipment/>
          <PaymentMethods/>
        </div>
        <PaymentSummary />
      </main>
    </PageWrapper>
  )

}

export default AccountOrderPayment