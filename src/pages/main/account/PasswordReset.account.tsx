import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import FormBase from "@/containers/form-base"
import InputBase from "@/containers/form-base/InputBase"
import { motion } from "framer-motion"
import { useSearchParams } from "react-router"
import usePostPasswordReset from "./api/usePostPasswordReset.api"
import AccountAnimationVariant from "./constant/animationVariant.contant"
import usePasswordResetForm from "./hook/usePasswordReset.hook"

const AccountPasswordReset = () => {

    const [params] = useSearchParams()
    const token = params.get("token")
    const email = params.get("email")
    const { onChange, form, errors, checkFormErrors } = usePasswordResetForm()
    const { confirm_password, password } = form
    const { isLoading, setRequest } = usePostPasswordReset({ token, password: password })
    const { hasError, list } = errors
    const passwordResetHandler = () => {
        const { hasError, setErrors } = checkFormErrors()
        if (hasError) return setErrors()
        setRequest()
    }

    return (
        <>
            <AnimatedTitle title={email} />
            <motion.section
                className="flex flex-col gap-4 items-center"
                initial={"hidden"}
                variants={AccountAnimationVariant}
                animate={"show"}
                transition={{
                    duration: 0.2,
                }}
            >
                <FormBase
                    className="w-full gap- max-w-[400px] grid"
                    errors={list}
                >
                    <InputBase
                        placeholder="Olgahats-2525"
                        labelPlacement="inside"
                        onChange={onChange}
                        name={"password"}
                        isRequired
                        autoComplete="off"
                        label={"Contraseña"}
                        value={password}
                    />
                    <InputBase
                        placeholder="Olgahats-2525"
                        labelPlacement="inside"
                        onChange={onChange}
                        autoComplete="off"
                        name={"confirm_password"}
                        isRequired
                        label={"Confirmar contraseña"}
                        value={confirm_password}
                    />
                </FormBase>
                <ActionButton
                    isDisabled={hasError}
                    isLoading={isLoading}
                    onPress={() => passwordResetHandler()}>
                    Enviar cambio
                </ActionButton>
            </motion.section>
        </>
    )
}


export default AccountPasswordReset