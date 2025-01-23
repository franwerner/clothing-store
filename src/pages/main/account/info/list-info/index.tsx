import { FormValidationErrors } from "my-hooks";
import { ChangeEventHandler, useMemo } from "react";
import { InfoFormProps } from "../hook/useInfoForm.hook";
import { useSelector } from "@/store";
import InfoItemDisplay from "./DisplayItem.info";
import InfoWrapperItem from "./WrapperItem.info";
import FormBase from "@/containers/form-base";
import InfoInputItem from "./InputItem.info";

interface InfoListProps {
    isEditing: boolean
    onChange: ChangeEventHandler<HTMLInputElement>;
    form: InfoFormProps
    errors: FormValidationErrors<InfoFormProps>
}

interface BaseItemInfo {
    text: any
    icon: string
    label: string
}

interface EditableItemInfo extends BaseItemInfo {
    errors?: string[]
    name: string
    value: string
}


const InfoList = ({ errors, form, isEditing, onChange }: InfoListProps) => {
    const userInfo = useSelector(({ user }) => user.info);
    const { email, create_at, phone, lastname, name } = userInfo || {};
    const date = useMemo(() => {
        return new Date(create_at || Date.now()).toISOString().replace("T", "  ").split(".")[0]
    }, [create_at])

    const staticItems: BaseItemInfo[] = [
        {
            text: email,
            icon: "email",
            label: "Correo electrónico",
        },
        {
            text: date,
            icon: "calendar_month",
            label: "Fecha de creación",
        },
    ]
    const editableItems: EditableItemInfo[] = [
        {
            name: "name",
            text: name,
            icon: "person",
            label: "Nombre",
            errors: errors.name,
            value: form.name
        },
        {
            name: "lastname",
            text: lastname,
            icon: "person",
            label: "Apellido",
            errors: errors.lastname,
            value: form.lastname
        },
        {
            name: "phone",
            text: phone || "No has registrado un teléfono",
            icon: "phone",
            label: "Teléfono",
            errors: errors.phone,
            value: form.phone
        },
        {
            name: "password",
            text: "************",
            icon: "key",
            label: "Contraseña",
            errors: errors.password,
            value: form.password
        },
    ]
    return (
        <FormBase
            errors={errors}
            className="grid grid-cols-1 sm:grid-cols-2 mx-auto gap-4 sm:gap-10">
            {staticItems.map((i, index) =>
                <InfoWrapperItem
                    key={index}
                    icon={i.icon}
                    isEditing={false}
                    hasError={false}
                >
                    <InfoItemDisplay
                        label={i.label}
                        text={i.text}
                    />
                </InfoWrapperItem>)}
            {editableItems.map((i, index) => (
                <InfoWrapperItem
                    key={index}
                    icon={i.icon}
                    isEditing={isEditing}
                    hasError={!!i.errors}
                >
                    {isEditing ?
                        <InfoInputItem onChange={onChange} {...i} />
                        :
                        <InfoItemDisplay
                            label={i.label}
                            text={i.text} />
                    }

                </InfoWrapperItem>
            ))}
        </FormBase>
    )

}

export type {
    BaseItemInfo,
    EditableItemInfo
}
export default InfoList