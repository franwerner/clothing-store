import { useDispatch, useSelector } from "@/store"
import numberToTwoDigits from "@/utils/numberToTwoDigits.utils"
import { useCounter } from "my-hooks"
import { HTMLProps, useEffect, useMemo } from "react"

const ShopcartExpiredCounter = (props: HTMLProps<HTMLSpanElement>) => {
    const dispatch = useDispatch()
    const expired_at = useSelector(({ shopcart }) => shopcart.expired_at)
    const now = useMemo(() => Date.now(), [])
    const checkExpiredAt = expired_at < now

    useEffect(() => {
        if (!expired_at) return
        resetCounter()
    }, [expired_at])

    const { hours, minutes, seconds, resetCounter } = useCounter({
        milliseconds: expired_at - now,
        stop: checkExpiredAt,
        type: "decrement",
        onFinish: () => {
            dispatch(({ shopcart }) => shopcart.reset())
        },
    })

    if (checkExpiredAt) return

    return (
        <span className="text-[14px] text-danger-400 font-medium" {...props}>{
            `Tienes ${numberToTwoDigits(hours)}:${numberToTwoDigits(minutes)}:${numberToTwoDigits(seconds)} para finalizar la compra.`
        }
        </span>
    )
}

export default ShopcartExpiredCounter
