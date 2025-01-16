import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import BaseInput from "@/components/BaseInput"
import usePasswordReset from "@/pages/account/api/usePasswordReset.api"
import { motion } from "framer-motion"
import { useSearchParams } from "react-router"
import BaseAccountForm from "./components/BaseAccountForm"
import AccountAnimationVariant from "./constant/animationVariant.contant"
import usePasswordResetForm from "./hook/usePasswordReset.hook"

const AccountPasswordReset = () => {

    const [params] = useSearchParams()
    const token = params.get("token") || ""
    const email = params.get("email")
    const { onChange, form, errors } = usePasswordResetForm()
    const { confirm_password, password } = form
    const { isLoading, setRequest } = usePasswordReset({ token, password: password })

    const {hasError,list} = errors

    const passwordResetHandler = () => {
        if (hasError) return
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
                        isInvalid={!!errors.list.password}
                        errorMessage={<div>
                            {list.password && list.password.map((i) => <p key={i}>* {i}</p>)}
                        </div>}
                        value={password}
                    />
                    <BaseInput
                        placeholder="Olgahats-2525"
                        labelPlacement="inside"
                        onChange={onChange}
                        autoComplete="off"
                        name={"confirm_password"}
                        isRequired
                        isInvalid={!!list.confirm_password}
                        errorMessage={list.confirm_password && list.confirm_password[0]}
                        label={"Confirmar contraseña"}
                        value={confirm_password}
                    />
                </BaseAccountForm>
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