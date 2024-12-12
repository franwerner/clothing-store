import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import BaseInput from "@/components/BaseInput"
import useForm from "@/hooks/useForm.hook"
import { motion } from "framer-motion"
import AccountAnimationVariant from "./constant/animationVariant.contant"
import useRequestPasswordReset from "@/api/hook/users/account/useRequestRecoverPasswordRequest.account"
import TokenResetTimeCounter from "@/components/TokenResetTimeCounter"
import { isRateLimiterResponse } from "@/utils/verifyResponsesData.utilts"


const AccountRequestRecoverPassword = () => {

    const { form, onChange } = useForm({ email: "" })

    const [{ isLoading, response }, { setRequest }] = useRequestPasswordReset(form.email)

    const { result } = response

    return (
        <>
            <AnimatedTitle title="Recupera tu contraseña" />
            <motion.section
                initial={"hidden"}
                variants={AccountAnimationVariant}
                animate={"show"}
                transition={{
                    duration: 0.2,
                }}
                className="flex-1 w-full  gap-6 justify-start  flex flex-col items-center">
                <BaseInput
                    onKeyUp={({ key }) => {
                        if (key === "Enter") {
                            setRequest()
                        }
                    }}
                    placeholder="tucorreo@recover.com"
                    labelPlacement="inside"
                    onChange={onChange}
                    className="max-w-[400px]"
                    name={"email"}
                    label={"Correo electronico"}
                    value={form.email}
                >
                </BaseInput>
                <ActionButton
                    onClick={() => setRequest()}
                    isLoading={isLoading}>
                    Solicitar cambio
                </ActionButton>
                {isRateLimiterResponse(response) && <TokenResetTimeCounter minutes={result.data.minutes} seconds={result.data.seconds} />}
            </motion.section>
        </>
    )
}

export default AccountRequestRecoverPassword