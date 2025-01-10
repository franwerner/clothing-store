import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import BaseInput from "@/components/BaseInput"
import { FormValidation } from "@/hooks/useValidationFom.hook"
import useRegister from "@/pages/account/api/useRegister.api"
import router from "@/router"
import { motion } from "framer-motion"
import { ChangeEventHandler, KeyboardEventHandler } from "react"
import BaseAccountForm from "./components/BaseAccountForm"
import AccountAnimationVariant from "./constant/animationVariant.contant"
import useRegisterForm, { RegisterFormProps } from "./hook/useRegisterForm.hook"
interface FormProps {
    onKeyUp: KeyboardEventHandler<HTMLFormElement>
    form: FormValidation<RegisterFormProps>
    onChange: ChangeEventHandler<HTMLInputElement>
}

const InputErrorMessage = ({ messages }: { messages?: Array<string> }) => {
    return (
        <div>
            {messages && messages.map((i) => <p key={i}>* {i}</p>)}
        </div>
    )
}

const Form = ({ form, onChange, onKeyUp }: FormProps) => {

    const { confirm_password, email, fullname, password, phone } = form

    return (
        <BaseAccountForm
            onKeyUp={onKeyUp}
            className="m-auto">
            <BaseInput
                placeholder="Franco Werner"
                labelPlacement="inside"
                onChange={onChange}
                name={"fullname"}
                isRequired
                isInvalid={fullname.hasError}
                errorMessage={<InputErrorMessage messages={fullname.errors} />}
                label={"Nombre y apellido"}
                value={fullname.value}
            />
            <BaseInput
                placeholder="tucorreo@ejemplo.com"
                labelPlacement="inside"
                onChange={onChange}
                name={"email"}
                isRequired
                label={"Correo electronico"}
                isInvalid={email.hasError}
                errorMessage={<InputErrorMessage messages={email.errors} />}
                value={email.value}
            />
            <BaseInput
                placeholder="+54 9 11 2345-6789"
                labelPlacement="inside"
                onChange={onChange}
                name={"phone"}
                label={"Telefono"}
                isInvalid={phone.hasError}
                errorMessage={<InputErrorMessage messages={phone.errors} />}
                value={phone.value}
            />
            <BaseInput
                placeholder="Olgahats-2525"
                labelPlacement="inside"
                onChange={onChange}
                name={"password"}
                isRequired
                autoComplete="off"
                label={"Contraseña"}
                isInvalid={password.hasError}
                errorMessage={<InputErrorMessage messages={password.errors} />}
                value={password.value}
            />
            <BaseInput
                placeholder="Olgahats-2525"
                labelPlacement="inside"
                onChange={onChange}
                autoComplete="off"
                name={"confirm_password"}
                isRequired
                isInvalid={confirm_password.hasError}
                errorMessage={<InputErrorMessage messages={confirm_password.errors} />}
                label={"Confirmar contraseña"}
                value={confirm_password.value}
            />

        </BaseAccountForm>
    )
}

const AccountRegister = () => {

    const { form, isFormIncomplete, onChange } = useRegisterForm()

    const { isLoading, setRequest } = useRegister({
        email: form.email.value,
        fullname: form.fullname.value,
        password: form.password.value,
        phone: form.phone.value
    })

    const onRegister = () => {
        if (isFormIncomplete()) return
        setRequest()
    }

    return (
        <>
            <AnimatedTitle title="Crea tu cuenta" />
            <motion.section
                initial={"hidden"}
                variants={AccountAnimationVariant}
                animate={"show"}
                transition={{
                    duration: 0.2,
                }}
                className=" w-full items-start flex flex-col gap-6  justify-center"
            >

                <Form
                    form={form}
                    onKeyUp={(e) => {
                        if (e.key == "Enter") {
                            onRegister()
                        }
                    }}
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
                    onPress={() => {
                        onRegister()
                    }}
                    isLoading={isLoading}
                    className="min-w-[300px] sm:w-auto ">
                    Registrarse
                </ActionButton>
            </motion.section>
        </>
    )
}

export default AccountRegister

