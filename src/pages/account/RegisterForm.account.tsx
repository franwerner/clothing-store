import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import BaseInput from "@/components/BaseInput"
import useForm from "@/hooks/useForm.hook"
import { motion } from "framer-motion"
import { ChangeEventHandler } from "react"


interface LoginFormProperties {
    fullname: string
    email: string
    phone: string
    password: string
    confirm_password: string
}

const Form = ({ form, onChange }: { form: LoginFormProperties, onChange: ChangeEventHandler<HTMLInputElement> }) => {

    return (
        <form className="w-full sm:w-[400px] m-auto px-3">
            <BaseInput
                placeholder="Franco Werner"
                labelPlacement="inside"
                onChange={onChange}
                name={"fullname"}
                isRequired
                label={"Nombre y apellido"}
                value={form.fullname}
            />
            <BaseInput
                placeholder="tucorreo@ejemplo.com"
                labelPlacement="inside"
                onChange={onChange}
                name={"email"}
                isRequired
                label={"Correo electronico"}
                value={form.email}
            />
            <BaseInput
                placeholder="+54 9 11 2345-6789"
                labelPlacement="inside"
                onChange={onChange}
                name={"phone"}
                label={"Telefono"}
                value={form.phone}
            />
            <BaseInput
                placeholder="Example-2525"
                labelPlacement="inside"
                onChange={onChange}
                name={"password"}
                isRequired
                label={"Contraseña"}
                value={form.password}
            />
            <BaseInput
                placeholder="Example-2525"
                labelPlacement="inside"
                onChange={onChange}
                name={"confirm_password"}
                isRequired
                label={"Confirmar contraseña"}
                value={form.confirm_password}
            />

        </form>
    )
}

const AccountRegisterForm = ({ changeForm }: { changeForm: () => void }) => {

    const { form, onChange } = useForm<LoginFormProperties>({ fullname: "", email: "", phone: "", password: "", confirm_password: "" })

    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0
            }}
            animate={{
                scale: 1,
                opacity: 1
            }}
            exit={{
                scale: 0,
                opacity: 0
            }}
            transition={{
                duration: 0.2,
            }}
            className=" w-full items-start flex flex-col gap-6  justify-center"
        >
            <AnimatedTitle title="Crea tu cuenta" className="w-full"></AnimatedTitle>

            <Form form={form} onChange={onChange} />
            <p className="w-full text-center">
                ¿Ya tienes una cuenta?
                <span className="inline-block ml-1 font-semibold underline cursor-pointer" onClick={changeForm}>Inicia sesión</span></p>

            <ActionButton className="min-w-[300px] sm:w-auto ">
                Registrarse
            </ActionButton>
        </motion.div>
    )
}

export default AccountRegisterForm