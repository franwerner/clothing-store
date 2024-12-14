import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import BaseInput from "@/components/BaseInput"
import usePasswordReset from "@/api/hook/users/account/usePasswordReset.account"
import useForm from "@/hooks/useForm.hook"
import router from "@/router"
import groupZodData from "@/utils/groupZodData.utilts"
import { isZodErrorResponse } from "@/utils/verifyResponsesData.utilts"
import { motion } from "framer-motion"
import { useLayoutEffect } from "react"
import { useSearchParams } from "react-router"
import AccountAnimationVariant from "./constant/animationVariant.contant"
import BaseAccountForm from "./components/BaseAccountForm"

const AccountPasswordReset = () => {

    const [params] = useSearchParams()
    const token = params.get("token") || ""
    const email = params.get("email")
    const { onChange, form } = useForm({ password: "", confirm_password: "" })
    const [{ isLoading, response }, { setRequest }] = usePasswordReset({ token, password: form.password })

    useLayoutEffect(() => {
        if (!token || !email) router.navigate("/cuenta")
    }, [])

    const group = isZodErrorResponse(response) ? groupZodData(response.result.data) : {}

    const passwordResetHandler = () => {
        if (form.confirm_password !== form.password) return
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
                        isInvalid={!!group.password}
                        errorMessage={<div>
                            {group.password && group.password.map((i) => <p key={i}>* {i}</p>)}
                        </div>}
                        value={form.password}
                    />
                    <BaseInput
                        placeholder="Olgahats-2525"
                        labelPlacement="inside"
                        onChange={onChange}
                        autoComplete="off"
                        name={"confirm_password"}
                        isRequired
                        isInvalid={form.confirm_password !== form.password}
                        errorMessage={"* Las contraseñas deben ser iguales."}
                        label={"Confirmar contraseña"}
                        value={form.confirm_password}
                    />
                </BaseAccountForm>
                <ActionButton
                    isLoading={isLoading}
                    onClick={() => passwordResetHandler()}>
                    Enviar cambio
                </ActionButton>
            </motion.section>
        </>
    )
}


export default AccountPasswordReset