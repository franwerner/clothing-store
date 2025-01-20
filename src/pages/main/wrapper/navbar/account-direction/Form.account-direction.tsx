import { Form, Input } from "@nextui-org/react"
import { ChangeEventHandler } from "react"
import { DirectionForm } from "./Modal.account-direction"

interface AccountDirectionFormProps {
    errors: Partial<Record<keyof DirectionForm, string[]>>
    form: DirectionForm
    onChange: ChangeEventHandler,
}

const AccountDirectionForm = ({ errors, form, onChange }: AccountDirectionFormProps) => {

    const { street, street_number, apartament, postal_code } = form

    return (
        <Form
            validationErrors={errors}
            className="grid grid-cols-1 xs:grid-cols-2  gap-3">
            <Input
                isRequired
                name="street"
                value={street}
                label="Calle"
                onChange={onChange}
            />
            <Input
                name="street_number"
                value={street_number}
                label="Altura"
                onChange={onChange}
            />
            <Input
                isRequired
                name="postal_code"
                value={postal_code}
                maxLength={4}
                minLength={4}
                label="Codigo postal"
                onChange={onChange}
            />
            <Input
                name="apartament"
                value={apartament}
                label="Departamento"
                onChange={onChange}
            />

        </Form>
    )
}

export default AccountDirectionForm