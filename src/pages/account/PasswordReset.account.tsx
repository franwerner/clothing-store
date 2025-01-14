import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import BaseInput from "@/components/BaseInput"
import usePasswordReset from "@/pages/account/api/usePasswordReset.api"
import router from "@/router"
import { motion } from "framer-motion"
import { useLayoutEffect } from "react"
import { useSearchParams } from "react-router"
import BaseAccountForm from "./components/BaseAccountForm"
import AccountAnimationVariant from "./constant/animationVariant.contant"
import usePasswordResetForm from "./hook/usePasswordReset.hook"

const AccountPasswordReset = () => {

    const [params] = useSearchParams()
    const token = params.get("token") || ""
    const email = params.get("email")
    const { onChange, form, isFormIncomplete } = usePasswordResetForm()
    const { confirm_password, password } = form
    const { isLoading, setRequest } = usePasswordReset({ token, password: password.value })

    useLayoutEffect(() => {
        if (!token || !email) router.navigate("/cuenta")
    }, [])

    const passwordResetHandler = () => {
        if (isFormIncomplete()) return
        setRequest()
    }

    return (
        <>
            <AnimatedTitle title={email} />
            <motion.section
                className="flex flex-col gap-2 items-center"
                initial={"hidden"}
                variants={AccountAnimationVariant}
                animate={"show"}
                transition={{
                    duration: 0.2,
                }}
            >
                <BaseAccountForm
                    onKeyUp={passwordResetHandler}
                >
                    <BaseInput
                        placeholder="Olgahats-2525"
                        labelPlacement="inside"
                        onChange={onChange}
                        name={"password"}
                        isRequired
                        autoComplete="off"
                        label={"Contraseña"}
                        isInvalid={password.hasError}
                        errorMessage={<div>
                            {password.errors && password.errors.map((i) => <p key={i}>* {i}</p>)}
                        </div>}
                        value={password.value}
                    />
                    <BaseInput
                        placeholder="Olgahats-2525"
                        labelPlacement="inside"
                        onChange={onChange}
                        autoComplete="off"
                        name={"confirm_password"}
                        isRequired
                        isInvalid={confirm_password.hasError}
                        errorMessage={"* Las contraseñas deben ser iguales."}
                        label={"Confirmar contraseña"}
                        value={confirm_password.value}
                    />
                </BaseAccountForm>
                <ActionButton
                    isDisabled={isFormIncomplete()}
                    isLoading={isLoading}
                    onPress={() => passwordResetHandler()}>
                    Enviar cambio
                </ActionButton>
            </motion.section>
        </>
    )
}


export default AccountPasswordReset