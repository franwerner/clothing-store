import { useSelector } from "@/store"
import { Input } from "@nextui-org/react"
import classNames from "classnames"
import React, { ChangeEventHandler, memo } from "react"
import { InfoFormProps } from "./hook/useInfoForm.hook"
import { FormValidation } from "@/hooks/useValidationFom.hook"
interface BaseItem {
    text: any
    icon: string
    label: string
}

interface EditableItem extends BaseItem {
    hasError: boolean
    errors: string[]
    name: string
    value: string
}

interface InfoListProps {
    isEditing: boolean
    onChange: ChangeEventHandler<HTMLInputElement>;
    form: FormValidation<InfoFormProps>;
}

interface InputItemProps extends EditableItem {
    onChange: ChangeEventHandler<HTMLInputElement>;
}

type InfoItemWrapperProps = {
    isEditing: boolean
    children: React.ReactNode
    hasError: boolean
} & Omit<BaseItem, "text" | "label">

const InfoItemInput = memo(({ errors, value, label, hasError, name, onChange }: InputItemProps) => (
    <Input
        className="max-w-[250px]"
        label={label}
        labelPlacement="inside"
        onChange={onChange}
        autoComplete="username"
        isInvalid={hasError}
        value={value}
        name={name}
        errorMessage={
            <div className="flex flex-col">
                {errors.map((error) => (
                    <span key={error}>* {error}</span>
                ))}
            </div>
        }
    />
))

const InfoItemDisplay = memo(({ text, label }: Pick<BaseItem, "text" | "label">) => (
    <div>
        <span className="text-sm text-default-500">{label}</span>
        <h3 className="truncate text-start text-md text-default-600">{text}</h3>
    </div>
))

const InfoItemWrapper = memo(({ icon, isEditing, hasError, children }: InfoItemWrapperProps) => (
    <div className="flex max-sm:flex-col max-sm:justify-center max-h-min group items-center gap-2">
        <span
            className={classNames(
                "material-symbols-outlined group-hover:scale-100 scale-90 shadow-md border-b-4 rounded-xl text-white border-2 p-2",
                {
                    "bg-danger-300 border-danger-400 sm:self-baseline": hasError && isEditing,
                    "bg-default-600 border-default-700": !isEditing,
                    "bg-primary-400 border-primary-500": !hasError && isEditing,
                }
            )}
        >
            {icon}
        </span>
        {children}
    </div>
))

const InfoList = ({ form, isEditing, onChange }: InfoListProps) => {
    const userInfo = useSelector(({ user }) => user.info);
    const { email, create_at, phone, fullname } = userInfo || {};

    const staticItems: BaseItem[] = [
        {
            text: email,
            icon: "email",
            label: "Correo electrónico",
        },
        {
            text: new Date(create_at || "").toISOString().replace("T", "  ").split(".")[0],
            icon: "calendar_month",
            label: "Fecha de creación",
        },
    ];

    const editableItems: EditableItem[] = [
        {
            name: "fullname",
            text: fullname,
            icon: "person",
            label: "Nombre completo",
            ...form.fullname,
        },
        {
            name: "phone",
            text: phone || "No has registrado un teléfono",
            icon: "phone",
            label: "Teléfono",
            ...form.phone,
        },
        {
            name: "password",
            text: "************",
            icon: "key",
            label: "Contraseña",
            ...form.password,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 mx-auto gap-4 sm:gap-10">
            {staticItems.map((i) => <InfoItemWrapper
                key={i.icon}
                icon={i.icon}
                isEditing={false}
                hasError={false}
            >
                <InfoItemDisplay
                    label={i.label}
                    text={i.text}
                />
            </InfoItemWrapper>)}

            {editableItems.map((i) => (
                <InfoItemWrapper
                    key={i.icon}
                    icon={i.icon}
                    isEditing={isEditing}
                    hasError={i.hasError}
                >
                    {isEditing ?
                        <InfoItemInput onChange={onChange} {...i} />
                        :
                        <InfoItemDisplay
                            label={i.label}
                            text={i.text} />
                    }

                </InfoItemWrapper>
            ))}
        </div>
    );
};

export default InfoList