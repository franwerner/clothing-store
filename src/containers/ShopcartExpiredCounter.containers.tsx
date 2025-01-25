import { useDispatch, useSelector } from "@/store"
import numberToTwoDigits from "@/utils/numberToTwoDigits.utils"
import { useCounter } from "my-hooks"
import { HTMLProps, useEffect } from "react"

const ShopcartExpiredCounter = (props: HTMLProps<HTMLSpanElement>) => {

    const now = Date.now()
    const dispatch = useDispatch()
    const expired_at = useSelector(({ shopcart }) => shopcart.expired_at)

    const checkExpiredAt = !expired_at || expired_at < now

    useEffect(() => {
        resetCounter()
    }, [expired_at])

    const { hours, minutes, seconds, isFinish, resetCounter } = useCounter({
        milliseconds: (checkExpiredAt ? now : expired_at) - now,
        stop: checkExpiredAt,
        type: "decrement",
        onFinish: () => {
            dispatch(({ shopcart }) => shopcart.changeExpired(0))
        },
    })

    if (expired_at === null) return

    return (
        <span className="text-[14px] text-danger-400 font-medium" {...props}>{
            isFinish ?
                "El carrito de compras se encuentra expirado." :
                `Tienes ${numberToTwoDigits(hours)}:${numberToTwoDigits(minutes)}:${numberToTwoDigits(seconds)} para finalizar la compra.`
        }
        </span>
    )
}

export default ShopcartExpiredCounter
