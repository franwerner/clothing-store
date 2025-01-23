import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import InputAuth from "@/components/InputAuth"
import useForm from "@/hooks/useForm.hook"
import router from "@/router"
import { motion } from "framer-motion"
import usePostLogin from "./api/usePostLogin.api"
import AccountAnimationVariant from "./constant/animationVariant.contant"
import InputBase from "@/containers/form-base/InputBase"
import FormBase from "@/containers/form-base"

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
                className=" w-full items-start flex  flex-col gap-2  justify-center"
            >
                <FormBase
                    className="sm:max-w-[400px] m-auto grid gap-2 px-3 w-full"
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            setRequest()
                        }
                    }}
                >
                    <InputBase
                        label="Email"
                        labelPlacement="inside"
                        onChange={onChange}
                        autoComplete="username"
                        isInvalid={code == "email_not_found"}
                        value={form.email}
                        errorMessage={message}
                        name="email"
                    />
                    <InputBase
                        onChange={onChange}
                        name="password"
                        autoComplete="current-password"
                        labelPlacement="inside"
                        isInvalid={code == "wrong_password"}
                        errorMessage={message}
                        value={form.password}
                        label="Contraseña"
                        type="password"
                    />
                    <span
                        onClick={() => router.navigate("/cuenta/recuperar")}
                        className=" cursor-pointer text-end right-0   hover:font-semibold  underline">
                        ¿Olvidaste tu contraseña?
                    </span>
                </FormBase>

                <p className="w-full my-1 text-center">
                    ¿No estas registrado?
                    <a
                        className="inline-block ml-1 font-semibold underline cursor-pointer hover:opacity-80"
                        onClick={() => router.navigate("/cuenta/registrarse")}>
                        Create una cuenta</a>
                </p>

                <ActionButton
                    isLoading={isLoading}
                    className=" pointer-events-auto "
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

