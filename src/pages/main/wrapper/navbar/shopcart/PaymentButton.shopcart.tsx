import usePostOrder from "@/api/order/usePostOrder"
import MercadoPagoIconSVG from "@/components/MercadopagoIconSVG"
import { useSelector } from "@/store"
import { Button } from "@nextui-org/react"

interface ShopcartPaymentButtonProps {
    onShow: () => void
}

const ShopcartPaymentButton = ({ onShow }: ShopcartPaymentButtonProps) => {

    const expired_at = useSelector(({ shopcart }) => shopcart.expired_at)

    const { isLoading, setRequest } = usePostOrder()

    return (
        <Button
            onPress={() => {
                setRequest({
                    onSuccess: ({ result }) => {
                        const { init_point } = result.data
                        window.open(init_point)
                        onShow()
                    }
                })
            }}
            isLoading={isLoading}
            isDisabled={expired_at === 0}
            className="p-2 px-3 h-auto m-auto rounded-full gap-1 [&>svg]:max-w-min flex items-center justify-center bg-[#01BCFF]">
            <MercadoPagoIconSVG />
            <span className="font-bold text-[16px] z-10 capitalize text-white">
                Pagar con mercado pago
            </span>
        </Button>
    )
}

export default ShopcartPaymentButton