import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import { motion } from "framer-motion"
import { useSearchParams } from "react-router"
import AccountAnimationVariant from "./constant/animationVariant.contant"
import usePasswordResetForm from "./hook/usePasswordReset.hook"
import usePostPasswordReset from "./api/usePostPasswordReset.api"
import { Form } from "@nextui-org/react"
import InputBase from "@/containers/form-base/InputBase"

const AccountPasswordReset = () => {

    const [params] = useSearchParams()
    const token = params.get("token")
    const email = params.get("email")
    const { onChange, form, errors } = usePasswordResetForm()
    const { confirm_password, password } = form
    const { isLoading, setRequest } = usePostPasswordReset({ token, password: password })

    const { hasError, list } = errors

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
                <Form
                    validationBehavior="native"
                    className="w-full max-w-[400px] grid"
                    validationErrors={errors.list}
                >
                    <InputBase
                        placeholder="Olgahats-2525"
                        labelPlacement="inside"
                        onChange={onChange}
                        name={"password"}
                        isRequired
                        autoComplete="off"
                        label={"Contraseña"}
                        errorMessage={<div>
                            {list.password && list.password.map((i) => <p key={i}>* {i}</p>)}
                        </div>}
                        value={password}
                    />
                    <InputBase
                        placeholder="Olgahats-2525"
                        labelPlacement="inside"
                        onChange={onChange}
                        autoComplete="off"
                        name={"confirm_password"}
                        isRequired
                        errorMessage={list.confirm_password && list.confirm_password[0]}
                        label={"Confirmar contraseña"}
                        value={confirm_password}
                    />
                </Form>
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