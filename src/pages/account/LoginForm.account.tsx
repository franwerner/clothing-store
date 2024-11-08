import ActionButton from "@/components/ActionButton";
import AnimatedTitle from "@/components/AnimatedTitle";
import BaseInput from "@/components/BaseInput";
import useForm from "@/hooks/useForm.hook";
import { motion, Variants } from "framer-motion";
import { ChangeEventHandler } from "react";

interface LoginFormProperties {
    username: string
    password: string
}

const Form = ({ form, onChange }: { form: LoginFormProperties, onChange: ChangeEventHandler<HTMLInputElement> }) => {

    return (
        <form className="w-full sm:w-[400px] m-auto px-3">
            <BaseInput
                label="Usuario"
                labelPlacement="inside"
                onChange={onChange}
                value={form.username}
                name="username"
            />
            <BaseInput
                onChange={onChange}
                name="password"
                labelPlacement="inside"
                value={form.password}
                label="contraseña"
                type="password"
            />
            <span className="w-full flex justify-end cursor-pointer underline">¿Olvidaste tu contraseña?</span>
        </form>
    )
}

const AccountLoginForm = ({ changeForm }: { changeForm: () => void }) => {

    const { form, onChange } = useForm<LoginFormProperties>({ username: "", password: "" })

    const variants:Variants = {
        hidden : {
            opacity: 0,
            scale: 0
        },
        show : {
            scale: 1,
            opacity: 1
        }
    } 

    return (
        <motion.div
            initial={"hidden"}
            variants={variants}
            animate={"show"}
            exit={"hidden"}
            transition={{
                duration: 0.2,
            }}
            className=" w-full items-start flex flex-col gap-8  justify-center"
        >
            <AnimatedTitle title="Bienvenido" className="w-full"></AnimatedTitle>

            <Form form={form} onChange={onChange}></Form>
            <p className="w-full text-center">
                ¿No estas registrado?
                <a className="inline-block ml-1 font-semibold underline cursor-pointer hover:opacity-80" onClick={changeForm}>Create una cuenta</a></p>

            <ActionButton className="min-w-[300px]  sm:w-auto">
                Iniciar sesión
            </ActionButton>
        </motion.div>
    )
}


export default AccountLoginForm

