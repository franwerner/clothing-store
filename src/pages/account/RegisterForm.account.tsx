import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import BaseInput from "@/components/BaseInput"
import useRegister from "@/hooks/api/useRegister.api"
import useForm from "@/hooks/useForm.hook"
import router from "@/router"
import groupZodData from "@/utils/groupZodData.utilts"
import { isZodErrorResponse } from "@/utils/verifyResponsesData.utilts"
import { UserSchema } from "clothing-store-shared/schema"
import { ResponseDataZodInError } from "clothing-store-shared/types"
import { motion } from "framer-motion"
import { ChangeEventHandler } from "react"
import AccountAnimationVariant from "./constant/animationVariant.contant"
interface LoginFormProperties {
    fullname: string
    email: string
    phone: string
    password: string
    confirm_password: string
}

const InputErrorMessage = ({ messages }: { messages?: Array<string> }) => {
    return (
        <div>
            {messages && messages.map((i) => <p key={i}>* {i}</p>)}
        </div>
    )
}

const Form = ({ form, onChange, data }: { form: LoginFormProperties, onChange: ChangeEventHandler<HTMLInputElement>, data?: ResponseDataZodInError<UserSchema.Insert> }) => {

    const group = groupZodData(data)

    return (
        <form className="w-full sm:w-[400px] m-auto px-3">
            <BaseInput
                placeholder="Franco Werner"
                labelPlacement="inside"
                onChange={onChange}
                name={"fullname"}
                isRequired
                isInvalid={!!group.fullname}
                errorMessage={<InputErrorMessage messages={group.fullname} />}
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
                errorMessage={<InputErrorMessage messages={group.email} />}
                value={form.email}
            />
            <BaseInput
                placeholder="+54 9 11 2345-6789"
                labelPlacement="inside"
                onChange={onChange}
                name={"phone"}
                label={"Telefono"}
                isInvalid={!!group.phone}
                errorMessage={<InputErrorMessage messages={group.phone} />}
                value={form.phone}
            />
            <BaseInput
                placeholder="Olgahats-2525"
                labelPlacement="inside"
                onChange={onChange}
                name={"password"}
                isRequired
                 autoComplete="off"
                label={"Contraseña"}
                isInvalid={!!group.password}
                errorMessage={<InputErrorMessage messages={group.password} />}
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

        </form>
    )
}


const AccountRegisterForm = () => {

    const { form, onChange } = useForm<LoginFormProperties>({ fullname: "", email: "", phone: "", password: "", confirm_password: "" })

    const { email, fullname, password, phone } = form
    const [{ isLoading, response }, { setRequest }] = useRegister({
        email,
        fullname,
        password,
        phone
    })
    
    
    return (
        <motion.div
            initial={"hidden"}
            variants={AccountAnimationVariant}
            animate={"show"}
            transition={{
                duration: 0.2,
            }}
            className=" w-full items-start flex flex-col gap-6  justify-center"
        >
            <AnimatedTitle title="Crea tu cuenta" className="w-full"/>
            <Form
                form={form}
                data={isZodErrorResponse(response) ? response.result.data : undefined}
                onChange={onChange}
            />
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
                    if (form.password !== form.confirm_password) return
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

