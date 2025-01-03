import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import useRequestEmailVerification from "@/api/hook/users/register/useRequestVerificationEmail.register"
import router from "@/router"
import { useSelector } from "@/store"
import { isRateLimiterResponse } from "@/utils/verifyResponsesData.utilts"
import { motion } from "framer-motion"
import { useEffect } from "react"
import AccountAnimationVariant from "./constant/animationVariant.contant"
import TokenResetTimeCounter from "@/components/TokenResetTimeCounter"



const AccountRequestEmailVerification = () => {
    const { email_confirmed, email } = useSelector((store) => store.user.info) ?? { email: "", email_confirmed: true }

    const [{ isLoading, response }, { setRequest }] = useRequestEmailVerification()

    useEffect(() => {
        if (email_confirmed || !email) router.navigate("/")
    }, [])

    const data = response.result.data

    return (
        <>
            <AnimatedTitle title={email} />
            <div className="bg-danger-400  shadow-lg top-0 rounded-lg p-5">
                <p className=" text-center text-sm  text-white uppercase">Recuerda que debes confirmar tu registro para habilitar la opción de realizar compras y demas beneficios.</p>
            </div>
            <motion.section
                variants={AccountAnimationVariant}
                animate="show"
                initial="hidden"
                transition={{
                    duration: 0.2,
                }}
                className=" w-full items-center flex   flex-col flex-1 justify-center"
            >
                <ActionButton
                    className="xs:min-w-[300px]"
                    onPress={() => {
                        setRequest()
                    }}
                    isLoading={isLoading}>
                    Reenviar
                </ActionButton>
                {isRateLimiterResponse(response) && <TokenResetTimeCounter minutes={data.minutes} seconds={data.seconds} />}

            </motion.section>
        </>
    )
}


export default AccountRequestEmailVerification