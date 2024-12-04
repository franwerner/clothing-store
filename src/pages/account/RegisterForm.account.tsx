import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import BaseInput from "@/components/BaseInput"
import useRegister from "@/hooks/api/useRegister.api"
import useForm from "@/hooks/useForm.hook"
import router from "@/router"
import { motion, Variants } from "framer-motion"
import { ChangeEventHandler, useState } from "react"


interface LoginFormProperties {
    fullname: string
    email: string
    phone: string
    password: string
    confirm_password: string
}

const Form = ({ form, onChange, data }: { form: LoginFormProperties, onChange: ChangeEventHandler<HTMLInputElement> }) => {

    const group = groupBy(data)
    return (
        <form className="w-full sm:w-[400px] m-auto px-3">
            <BaseInput
                placeholder="Franco Werner"
                labelPlacement="inside"
                onChange={onChange}
                name={"fullname"}
                isRequired
                isInvalid={!!group.fullname}
                errorMessage={
                    <div>
                        {group.fullname && group.fullname.map((i, index) => {
                            return <p>{i}</p>
                        })}
                    </div>
                }
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
                isInvalid={!!group.email}
                errorMessage={
                    <div>
                        {group.email && group.email.map((i, index) => {
                            return <p>{i}</p>
                        })}
                    </div>
                }
                value={form.email}
            />
            <BaseInput
                placeholder="+54 9 11 2345-6789"
                labelPlacement="inside"
                onChange={onChange}
                name={"phone"}
                label={"Telefono"}
                isInvalid={!!group.phone}
                errorMessage={
                    <div>
                        {group.phone && group.phone.map((i, index) => {
                            return <p>{i}</p>
                        })}
                    </div>
                }
                value={form.phone}
            />
            <BaseInput
                placeholder="Example-2525"
                labelPlacement="inside"
                onChange={onChange}
                name={"password"}
                isRequired
                label={"Contraseña"}
                isInvalid={!!group.password}
                errorMessage={
                    <div>
                        {group.password && group.password.map((i, index) => {
                            return <p>* {i}</p>
                        })}
                    </div>
                }
                value={form.password}
            />
            <BaseInput
                placeholder="Example-2525"
                labelPlacement="inside"
                onChange={onChange}
                name={"confirm_password"}
                isRequired
                isInvalid={!!group.confirm_password}
                errorMessage={
                    <div>
                        {group.confirm_password && group.confirm_password.map((i, index) => {
                            return <p>{i}</p>
                        })}
                    </div>
                }
                label={"Confirmar contraseña"}
                value={form.confirm_password}
            />

        </form>
    )
}

const groupBy = (arr: Array<{ source: string, reason: any }>) => {

    if (!arr) return {}
    return arr.reduce((acc, current) => {

        const { source, reason } = current
        const t = acc[source]
        if (t) {
            t.push(reason)
        } else {
            acc[source] = [reason]
        }

        return acc
    }, {})
}

const AccountRegisterForm = () => {

    const { form, onChange } = useForm<LoginFormProperties>({ fullname: "", email: "", phone: "", password: "", confirm_password: "" })

    const [{ isLoading, response }, { setRequest }] = useRegister(form)

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

    return (
        <motion.div
            initial={"hidden"}
            variants={variants}
            animate={"show"}
            transition={{
                duration: 0.2,
            }}
            className=" w-full items-start flex flex-col gap-6  justify-center"
        >
            <AnimatedTitle title="Crea tu cuenta" className="w-full"></AnimatedTitle>

            <Form form={form} data={response.result.data} onChange={onChange} />
            <p className="w-full text-center">
                ¿Ya tienes una cuenta?
                <a
                    className="inline-block ml-1 font-semibold underline cursor-pointer  hover:opacity-80"
                    onClick={() => router.navigate("/cuenta/ingresar")}>
                    Inicia sesión
                </a>
            </p>

            <ActionButton
                onClick={() => {
                    setRequest()
                }}
                isLoading={isLoading}
                className="min-w-[300px] sm:w-auto ">
                Registrarse
            </ActionButton>
        </motion.div>
    )
}

export default AccountRegisterForm

