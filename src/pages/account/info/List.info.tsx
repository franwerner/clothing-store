import { useSelector } from "@/store"
import groupZodData from "@/utils/groupZodData.utilts"
import { Input } from "@nextui-org/react"
import classNames from "classnames"
import { UserSchema } from "clothing-store-shared/schema"
import { ResponseDataZodInError } from "clothing-store-shared/types"
import { ChangeEventHandler, memo, useMemo } from "react"


type UpdateInfo = Omit<UserSchema.UpdateInfo, "user_id">

interface Items {
    name?: keyof UpdateInfo
    value: any
    icon: string
    label: string
};

interface AccountInfoItemsProps extends Items {
    form_value?: any,
    isEdit?: boolean,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    errorMessage?: Array<string>
}

interface InfoListProps {
    isEdit: boolean,
    data: ResponseDataZodInError<UpdateInfo>,
    onChange: ChangeEventHandler<HTMLInputElement>,
    form: UpdateInfo
}

const InfoItems = memo(({
    icon,
    value,
    isEdit,
    form_value,
    onChange,
    name,
    label,
    errorMessage
}: AccountInfoItemsProps) => {
    return (
        <div className="flex max-sm:flex-col max-sm:justify-center max-h-min group items-center  gap-2 ">
            <span className={
                classNames(
                    "material-symbols-outlined group-hover:scale-100 scale-90 shadow-md border-b-4 rounded-xl text-white border-2 p-2",
                    {
                        "bg-danger-300 border-danger-400 sm:self-baseline": !!errorMessage && isEdit,
                        "bg-default-600 border-default-700": !isEdit,
                        "bg-primary-400 border-primary-500": !errorMessage && isEdit
                    }
                )
            }>
                {icon}
            </span>
            {
                isEdit ?
                    <Input
                        className="max-w-[250px]"
                        label={label}
                        labelPlacement="inside"
                        onChange={onChange}
                        autoComplete="username"
                        isInvalid={!!errorMessage}
                        value={form_value}
                        name={name}
                        errorMessage={errorMessage && <div className="flex flex-col">{errorMessage.map(i => <span key={i}>* {i}</span>)}</div>}
                    />
                    :
                    <div className="flex flex-col max-sm:items-center">
                        <span className="text-sm text-default-500 ">{label}</span>
                        <h3 className="truncate text-start text-md text-default-600">{value}</h3>
                    </div>
            }
        </div>
    )
})

const InfoList = ({ data, form, isEdit, onChange }: InfoListProps) => {

    const user_info = useSelector(({ user }) => user.info)

    const { fullname, create_at, phone, email } = user_info || {}

    const group = groupZodData(data)

    const items = useMemo(() => {
        const items: Array<Items> = [
            {
                name: "fullname",
                value: fullname,
                icon: "person",
                label: "Nombre completo"
            },
            {
                value: create_at ? new Date(create_at).toISOString().replace("T", "  ").split(".")[0] : "",
                icon: "calendar_month",
                label: "Fecha de creación"
            },
            {
                name: "phone",
                value: phone || "No has registrado un telefono",
                icon: "phone",
                label: "Telefono"
            },
            {
                value: email,
                icon: "email",
                label: "Correo electronico"
            },
            {
                name: "password",
                value: "************",
                icon: "key",
                label: "Contraseña"
            }
        ]
        return items
    }, [user_info])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2  mx-auto  gap-4 sm:gap-10">
            {
                items.map(i => {
                    return i.name ? <InfoItems
                        key={i.icon}
                        {...i}
                        onChange={onChange}
                        isEdit={isEdit} {...i}
                        errorMessage={group[i.name]}
                        form_value={form[i.name]}
                    /> : <InfoItems {...i} key={i.icon} />
                })
            }
        </div>
    )


}

export default InfoList