import numberToTwoDigits from "@/utils/numberToTwoDigits.utils"
import { AnimatePresence, motion } from "framer-motion"
import { useCounter } from "my-hooks"

const TokenResetTimeCounter = (props: { minutes: number, seconds: number }) => {

    const {
        minutes,
        seconds,
        isFinish
    } = useCounter({ type: "decrement", minutes: props.minutes, seconds: props.seconds, step: 1 })
    return (
        <AnimatePresence mode="sync">
            {
                !isFinish && <motion.div
                    initial={{
                        scale: 0
                    }}
                    animate={{
                        scale: 1
                    }}
                    exit={{
                        scale: 0
                    }}
                >
                    <p>Debes esperar
                        <span className="font-bold mx-1">{numberToTwoDigits(minutes)}:{numberToTwoDigits(seconds)}</span>
                        antes de poder enviar otro token.</p>
                </motion.div>
            }
        </AnimatePresence>

    )
}
export default TokenResetTimeCounter