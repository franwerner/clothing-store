import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import useUpdateInfoUser from "@/pages/account/info/api/useUpdateInfo.api"
import router from "@/router"
import { useSelector } from "@/store"
import classNames from "classnames"
import { useEffect, useState } from "react"
import useInfoForm from "./hook/useInfoForm.hook"
import InfoList from "./List.info"
import InfoModalAuth from "./ModalAuth.info"
import removePropertiesByValues from "@/utils/removePropertiesByValues.utilts"

const AccountInfo = () => {
    const [isEditing, setisEditing] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const { isAuthorized, expired_at } = useSelector(({ user }) => user.edit_authorization) || { expired_at: 0, isAuthorized: false }
    const { fullname, phone, email } = useSelector(({ user }) => user.info) || {}

    const onShowModal = () => setShowModal(prev => !prev)
    const { form, onChange, isFormIncomplete, setValue } = useInfoForm({
        fullname: fullname ?? "",
        phone: phone ?? "",
        password: ""
    })

    const body = removePropertiesByValues({
        fullname: form.fullname.value,
        password: form.password.value,
        phone: form.phone.value
    }, [fullname, phone, "", undefined])

    const { isLoading, setRequest } = useUpdateInfoUser(body)

    useEffect(() => {
        if (!email) router.navigate("/cuenta/ingresar")
    }, [])

    const isContainsChanges = Object.keys(body).length > 0

    return (
        <>
            <AnimatedTitle
                className="max-sm:[&_.animatedTitle]:text-2xl"
                title="Información de la cuenta" />
            {
                isEditing && <span
                    onClick={() => {
                        setisEditing(false)
                    }}
                    className="material-symbols-outlined absolute hover:scale-90 cursor-pointer right-0 top-12">
                    close
                </span>
            }
            <InfoList
                onChange={onChange}
                form={form}
                isEditing={isEditing} />
            <ActionButton
                className={classNames(
                    "bg-primary-400", {
                    "bg-success-400": isEditing,
                    "opacity-50 pointer-events-none": !isContainsChanges && isEditing,
                    "bg-danger-400 pointer-events-none": isFormIncomplete() && isEditing

                })}
                startContent={
                    <p className="flex gap-2 items-center">
                        {isEditing ? "Guardar cambios" : "Editar información"}
                        {
                            !isLoading && <span className={"material-symbols-outlined"}>
                                {isEditing ? "cloud_upload" : "edit"}
                            </span>
                        }
                    </p>
                }
                isLoading={isLoading}
                onPress={() => {
                    if (!isAuthorized || Date.now() > expired_at) return onShowModal()

                    if (isEditing) {
                        setRequest({
                            onSuccess: () => {
                                setValue("password", "")
                            }
                        })
                    } else {
                        setisEditing(true)
                    }

                }}>
            </ActionButton>
            <InfoModalAuth
                onShow={onShowModal}
                show={showModal}
            />
        </>
    )
}


export default AccountInfo

