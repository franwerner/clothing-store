import { motion } from "framer-motion"
import AccountAnimationVariant from "./constant/animationVariant.contant"
import AnimatedTitle from "@/components/AnimatedTitle"
import { useSelector } from "@/store"
import { useEffect, useRef } from "react"
import router from "@/router"
import ActionButton from "@/components/ActionButton"
import Counter from "@/components/Counter"




const AccountConfirmation = () => {

    const refCounter = useRef(60)
    const { email_confirmed, email } = useSelector((store) => store.user.info) ?? { email: "", email_confirmed: true }

    useEffect(() => {
        if (email_confirmed || !email) router.navigate("/")
    
    }, [])



    return (
        <motion.div
            variants={AccountAnimationVariant}
            animate="show"
            initial="hidden"
            transition={{
                duration: 0.2,
            }}
            className=" w-full items-center flex flex-col flex-1 justify-center"
        >
            <AnimatedTitle title={email} className="w-full" />
            <div className="flex-1 grid place-content-center">
                <ActionButton>
                    Reenviar
                </ActionButton>
                <span>Podes reenviar en <Counter hours={1}></Counter> segundos.</span>
            </div>

        </motion.div>
    )
}


export default AccountConfirmation