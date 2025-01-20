import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import BaseInput from "@/components/BaseInput"
import useForm from "@/hooks/useForm.hook"
import router from "@/router"
import { motion } from "framer-motion"
import usePostLogin from "./api/usePostLogin.api"
import BaseAccountForm from "./components/BaseAccountForm"
import AccountAnimationVariant from "./constant/animationVariant.contant"

interface LoginFormProps {
    email: string
    password: string
}

const AccountLogin = () => {
    const { form, onChange } = useForm<LoginFormProps>({ email: "", password: "" });
    const { isLoading, response, setRequest } = usePostLogin(form)
    const { code, message } = response.result_error ?? {}

    return (
        <>
            <AnimatedTitle
                title="Bienvenido"
            />
            <motion.section
                initial={"hidden"}
                variants={AccountAnimationVariant}
                animate={"show"}
                transition={{
                    duration: 0.2,
                }}
                className=" w-full items-start flex  flex-col gap-8  justify-center"
            >
                <div className="sm:w-[400px] w-full relative  mb-1 m-auto">
                    <BaseAccountForm
                        onKeyUp={() => setRequest()}
                    >
                        <BaseInput
                            label="Email"
                            labelPlacement="inside"
                            onChange={onChange}
                            autoComplete="username"
                            isInvalid={code == "email_not_found"}
                            value={form.email}
                            errorMessage={message}
                            name="email"
                        />
                        <BaseInput
                            onChange={onChange}
                            name="password"
                            autoComplete="current-password"
                            labelPlacement="inside"
                            isInvalid={code == "wrong_password"}
                            errorMessage={message}
                            value={form.password}
                            label="contraseña"
                            type="password"
                        />
                    </BaseAccountForm>
                    <span
                        onClick={() => router.navigate("/cuenta/recuperar")}
                        className=" cursor-pointer absolute right-0 mt-1  hover:font-semibold  underline">
                        ¿Olvidaste tu contraseña?
                    </span>
                </div>

                <p className="w-full text-center">
                    ¿No estas registrado?
                    <a
                        className="inline-block ml-1 font-semibold underline cursor-pointer hover:opacity-80"
                        onClick={() => router.navigate("/cuenta/registrarse")}>
                        Create una cuenta</a>
                </p>

                <ActionButton
                    isLoading={isLoading}
                    className="sm:min-w-[300px] pointer-events-auto"
                    onPress={() => {
                        setRequest()
                    }}
                >
                    Iniciar sesión
                </ActionButton>
            </motion.section>
        </>
    )
}


export default AccountLogin

