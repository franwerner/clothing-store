import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import TokenResetTimeCounter from "@/pages/main/account/components/TokenResetTimeCounter"
import { useSelector } from "@/store"
import { getRateLimiterData } from "@/utils/getResponseData.utilts"
import { motion } from "framer-motion"
import useGetRequestEmailVerification from "./api/useGetRequestVerificationEmail.api"
import withAuthorization from "./components/withAuthorization"
import AccountAnimationVariant from "./constant/animationVariant.contant"

const AccountRequestEmailVerification = () => {
    const { email } = useSelector((store) => store.user.info) ?? { email: "", email_confirmed: true }
    const { isLoading, response, setRequest } = useGetRequestEmailVerification()
    const { code } = response.result_error ?? {}
    const data = getRateLimiterData(response)

    return (
        <>
            <AnimatedTitle title={email} />
            <p className=" text-center text-md bg-danger-400 p-6 text-white rounded-lg  font-medium uppercase">
                Confirma tu direccion de corro electronico para continuar.
            </p>
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
                    className="xs:min-w-[400px]"
                    onPress={() => {
                        setRequest()
                    }}
                    isLoading={isLoading}>
                    Reenviar
                </ActionButton>
                {code === "rate_limit" && <TokenResetTimeCounter minutes={data.minutes} seconds={data.seconds} />}

            </motion.section>
        </>
    )
}


export default withAuthorization(AccountRequestEmailVerification, {
    to: "/", verification: ({ email_confirmed }) => !email_confirmed
})