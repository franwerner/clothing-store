import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import BaseInput from "@/components/BaseInput"
import TokenResetTimeCounter from "@/components/TokenResetTimeCounter"
import useForm from "@/hooks/useForm.hook"
import { getRateLimiterData } from "@/utils/getResponseData.utilts"
import { motion } from "framer-motion"
import usePostRequestPasswordReset from "./api/usePostRequestRecoverPasswordRequest.api"
import AccountAnimationVariant from "./constant/animationVariant.contant"


const AccountRequestRecoverPassword = () => {

    const { form, onChange } = useForm({ email: "" })

    const { isLoading, response, setRequest } = usePostRequestPasswordReset(form.email)

    const { code } = response.result_error ?? {}
    
    const data = getRateLimiterData(response)

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
                    onPress={() => setRequest()}
                    isLoading={isLoading}>
                    Solicitar cambio
                </ActionButton>
                {code === "rate_limit" && <TokenResetTimeCounter minutes={data.minutes} seconds={data.seconds} />}
            </motion.section>
        </>
    )
}

export default AccountRequestRecoverPassword