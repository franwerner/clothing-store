import InputBase from "@/containers/form-base/InputBase"
import { FormValidationErrors } from "my-hooks"
import { ChangeEventHandler } from "react"
import { RegisterForm } from "./hook/useRegisterForm.hook"
import FormBase from "@/containers/form-base"

interface FormProps {
    form: RegisterForm
    errors: FormValidationErrors<RegisterForm>
    onChange: ChangeEventHandler<HTMLInputElement>
    onRegister: () => void
}

const FormRegister = ({ form, onChange, errors, onRegister }: FormProps) => {

    const { confirm_password, email, lastname, name, password, phone,confirm_email} = form

    return (
        <FormBase
            errors={errors}
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                    onRegister()
                }
            }}
            className="m-auto px-2 sm:max-w-[400px] w-full grid gap-2">
            <InputBase
                placeholder="Franco"
                onChange={onChange}
                name={"name"}
                isRequired
                value={name}
                label={"Nombre"}
            />
            <InputBase
                placeholder="Werner"
                onChange={onChange}
                name={"lastname"}
                isRequired
                label={"Apellido"}
                value={lastname}
            />
            <InputBase
                placeholder="tucorreo@ejemplo.com"
                onChange={onChange}
                name={"email"}
                isRequired
                label={"Correo electronico"}
                value={email}
            />
            <InputBase
                placeholder="tucorreo@confirm.com"
                onChange={onChange}
                name={"confirm_email"}
                isRequired
                label={"Confirmar correo lectronico"}
                value={confirm_email}
            />
            <InputBase
                placeholder="+54 9 11 2345-6789"
                onChange={onChange}
                name={"phone"}
                label={"Telefono"}
                value={phone}
            />
            <InputBase
                placeholder="Olgahats-2525"
                onChange={onChange}
                name={"password"}
                isRequired
                autoComplete="off"
                label={"Contraseña"}
                value={password}
            />
            <InputBase
                placeholder="Olgahats-2525"
                onChange={onChange}
                autoComplete="off"
                name={"confirm_password"}
                isRequired
                label={"Confirmar contraseña"}
                value={confirm_password}
            />
        </FormBase>
    )
}

export default FormRegister