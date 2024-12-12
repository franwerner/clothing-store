import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import useForm from "@/hooks/useForm.hook"
import router from "@/router"
import { useSelector } from "@/store"
import { Input } from "@nextui-org/react"
import { AnimatePresence } from "framer-motion"
import { memo, useLayoutEffect, useState } from "react"

interface AccountInfoItemsProps {
    value: any,
    edit?: boolean,
    icon: string,
    form_value?: any,
    isEdit: boolean,
    onChange: any,
    name?: string,
    label: string,
}

const AccountInfoItems = memo(({ icon, value, isEdit, form_value, onChange, name, label }: AccountInfoItemsProps) => {
    return (
        <div className="flex max-sm:flex-col max-sm:justify-center items-center gap-2 " key={icon}>
            <span className="material-symbols-outlined bg-secondary-300 border-secondary-200 rounded-xl text-white border-2 p-2">
                {icon}
            </span>
            <AnimatePresence>
                {
                    isEdit ?
                        <Input
                            label={label}
                            labelPlacement="inside"
                            onChange={onChange}
                            autoComplete="username"
                            value={form_value}
                            name={name}
                        />
                        :
                        <h3 className="truncate text-start">{value}</h3>
                }
            </AnimatePresence>
        </div>
    )
})

const AccountInfo = () => {

    const { fullname, create_at, email, phone } = useSelector(({ user }) => user.info) || {}

    const [isEdit, setIsEdit] = useState(false)

    const { form, onChange } = useForm({ email, fullname, phone, password: "" })

    useLayoutEffect(() => {
        if (!email) router.navigate("/cuenta/ingresar")
    }, [])


    const items = [
        {
            name: "fullname",
            value: fullname,
            icon: "person",
            edit: true,
            label: "Nombre completo"
        },
        {
            value: create_at ? new Date(create_at).toISOString().replace("T", "  ").split(".")[0] : "",
            icon: "calendar_month",
            edit: false
        },
        {
            name: "phone",
            value: phone || "No has registrado un telefono",
            icon: "phone",
            edit: true,
            label: "Telefono"
        },
        {
            name: "email",
            value: email,
            icon: "email",
            edit: false,
            label: "Correo electronico"
        },
        {
            name: "password",
            value: "************",
            icon: "key",
            edit: true,
            label: "Contraseña"
        }
    ]

    return (
        <>
            <AnimatedTitle title="Información de la cuenta" />
            <div className="grid grid-cols-1 sm:grid-cols-2 item m-5 gap-10">
                {
                    items.map(i => <AccountInfoItems
                        key={i.icon}
                        onChange={onChange}
                        isEdit={isEdit && i.edit} {...i}
                        form_value={i.name ? form[i.name] : ""}
                    />)
                }
            </div>
            <ActionButton onClick={() => setIsEdit(prev => !prev)}>
                {isEdit ? "Guardar información" : "Editar información"}
            </ActionButton>
        </>
    )
}


export default AccountInfo