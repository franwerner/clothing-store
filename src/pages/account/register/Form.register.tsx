import BaseInput from "@/components/BaseInput"
import { ChangeEventHandler, KeyboardEventHandler } from "react"
import { RegisterForm } from "./hook/useRegisterForm.hook"
import { Form } from "@nextui-org/react"
import { FormValidationErrors } from "my-hooks"
import BaseAccountForm from "../components/BaseAccountForm"

const InputErrorMessage = ({ messages }: { messages?: Array<string> }) => {
    return (
        <div>
            {messages && messages.map((i) => <p key={i}>* {i}</p>)}
        </div>
    )
}

interface FormProps {
    onKeyUp: KeyboardEventHandler<HTMLFormElement>
    form: RegisterForm
    errors: FormValidationErrors<RegisterForm>
    onChange: ChangeEventHandler<HTMLInputElement>
}


const FormRegister = ({ form, onChange, onKeyUp, errors }: FormProps) => {

    const { confirm_password, email, fullname, password, phone } = form

    return (
        <BaseAccountForm
            className="m-auto"
            onKeyUp={onKeyUp}>
            <BaseInput
                placeholder="Franco Werner"
                labelPlacement="inside"
                onChange={onChange}
                isInvalid={!!errors.fullname}
                name={"fullname"}
                isRequired
                errorMessage={<InputErrorMessage messages={errors.fullname} />}
                label={"Nombre y apellido"}
                value={fullname}
            />
            <BaseInput
                placeholder="tucorreo@ejemplo.com"
                labelPlacement="inside"
                isInvalid={!!errors.email}
                onChange={onChange}
                name={"email"}
                isRequired
                label={"Correo electronico"}
                errorMessage={<InputErrorMessage messages={errors.email} />}
                value={email}
            />
            <BaseInput
                placeholder="+54 9 11 2345-6789"
                labelPlacement="inside"
                onChange={onChange}
                isInvalid={!!errors.phone}
                name={"phone"}
                label={"Telefono"}
                errorMessage={<InputErrorMessage messages={errors.phone} />}
                value={phone}
            />
            <BaseInput
                placeholder="Olgahats-2525"
                labelPlacement="inside"
                onChange={onChange}
                name={"password"}
                isInvalid={!!errors.password}
                isRequired
                autoComplete="off"
                label={"Contraseña"}
                errorMessage={<InputErrorMessage messages={errors.password} />}
                value={password}
            />
            <BaseInput
                placeholder="Olgahats-2525"
                labelPlacement="inside"
                onChange={onChange}
                autoComplete="off"
                isInvalid={!!errors.confirm_password}
                name={"confirm_password"}
                isRequired
                errorMessage={<InputErrorMessage messages={errors.confirm_password} />}
                label={"Confirmar contraseña"}
                value={confirm_password}
            />
        </BaseAccountForm>
    )
}

export default FormRegister