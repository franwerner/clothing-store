import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import BaseInput from "@/components/BaseInput"
import useLogin from "@/hooks/api/useLogin.api"
import { UseFetchCustomResult } from "@/hooks/useFetchCustom.hooks"
import useForm from "@/hooks/useForm.hook"
import router from "@/router"
import { motion, Variants } from "framer-motion"
import { ChangeEventHandler, KeyboardEvent, KeyboardEventHandler } from "react"

interface LoginFormProps {
    email: string
    password: string
}

const variants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0
    },
    show: {
        scale: 1,
        opacity: 1
    }
}

const Form = ({ form, onChange, result, onKeyUp }: { form: LoginFormProps, onChange: ChangeEventHandler<HTMLInputElement>, result: UseFetchCustomResult, onKeyUp: KeyboardEventHandler<HTMLFormElement> }) => {

    return (
        <form
            onKeyUp={onKeyUp} >
            <BaseInput
                label="Email"
                labelPlacement="inside"
                onChange={onChange}
                isInvalid={result.code == "email_not_found"}
                value={form.email}
                errorMessage={result.message}
                name="email"
            />
            <BaseInput
                onChange={onChange}
                name="password"
                labelPlacement="inside"
                isInvalid={result.code == "wrong_password"}
                errorMessage={result.message}
                value={form.password}
                label="contraseña"
                type="password"
            />
        </form>
    )
}


const AccountLoginForm = () => {

    const { form, onChange } = useForm<LoginFormProps>({ email: "", password: "" });

    const [{ isLoading, response }, { setRequest }] = useLogin(form)

    const onKeyUp = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter" && !isLoading) {
            setRequest()
        }
    }

    return (
        <motion.div
            initial={"hidden"}
            variants={variants}
            animate={"show"}
            transition={{
                duration: 0.2,
            }}
            className=" w-full items-start flex flex-col gap-8  justify-center"
        >
            <AnimatedTitle
                title="Bienvenido"
                className="w-full" />

            <div className="sm:w-[400px] w-full relative mb-1 m-auto ">
                <Form form={form}
                    result={response.result}
                    onKeyUp={onKeyUp}
                    onChange={onChange} />
                <span
                    onClick={() => router.navigate("/cuenta/recuperar")}
                    className=" cursor-pointer absolute right-0  hover:font-semibold  underline">
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
                onClick={() => {
                    setRequest()
                }}
            >
                Iniciar sesión
            </ActionButton>
        </motion.div>
    )
}


export default AccountLoginForm

