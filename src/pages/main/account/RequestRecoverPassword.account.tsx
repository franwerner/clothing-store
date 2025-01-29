import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import TokenResetTimeCounter from "@/pages/main/account/components/TokenResetTimeCounter"
import useForm from "@/hooks/useForm.hook"
import { getRateLimiterData } from "@/utils/getResponseData.utilts"
import { motion } from "framer-motion"
import usePostRequestPasswordReset from "./api/usePostRequestRecoverPasswordRequest.api"
import AccountAnimationVariant from "./constant/animationVariant.contant"
import InputBase from "@/containers/form-base/InputBase"

const AccountRequestRecoverPassword = () => {
    const { form, onChange } = useForm({ email: "" })
    const { isLoading, response, setRequest } = usePostRequestPasswordReset(form.email)
    const { code,message } = response.result_error ?? {}
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
                <InputBase
                    onKeyUp={({ key }) => {
                        if (key === "Enter") {
                            setRequest()
                        }
                    }}
                    isInvalid = {code === "email_not_found"}
                    placeholder="tucorreo@recover.com"
                    labelPlacement="inside"
                    onChange={onChange}
                    className="max-w-[400px]"
                    name={"email"}
                    errorMessage = {message}
                    label={"Correo electronico"}
                    value={form.email}
                >
                </InputBase>
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