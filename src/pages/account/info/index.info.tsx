import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import withAuthorization from "@/containers/hoc/withAuthorization.hoc"
import useUpdateInfoUser from "@/pages/account/info/api/useUpdateInfo.api"
import { useSelector } from "@/store"
import removePropertiesByValues from "@/utils/removePropertiesByValues.utilts"
import classNames from "classnames"
import { useState } from "react"
import useInfoForm from "./hook/useInfoForm.hook"
import InfoList from "./List.info"
import InfoModalAuth from "./ModalAuth.info"

const AccountInfo = () => {
    const [isEditing, setisEditing] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const { isAuthorized, expired_at } = useSelector(({ user }) => user.edit_authorization) || { expired_at: 0, isAuthorized: false }
    const { fullname = "", phone } = useSelector(({ user }) => user.info) || {}

    const onShowModal = () => setShowModal(prev => !prev)

    const { form, onChange, errors, setForm } = useInfoForm({
        fullname: fullname,
        phone: phone ?? "",
        password: ""
    })
    const body = removePropertiesByValues({
        fullname: form.fullname,
        password: form.password,
        phone: form.phone
    }, [fullname, phone, "", undefined])
    const { isLoading, setRequest } = useUpdateInfoUser(body)
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
                errors={errors.list}
                onChange={onChange}
                form={form}
                isEditing={isEditing} />
            <ActionButton
                className={classNames(
                    "bg-black", {
                    "opacity-70 pointer-events-none": (errors.hasError || !isContainsChanges) && isEditing,
                    "bg-danger-400 pointer-events-none": errors.hasError && isEditing

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
                                setForm("password", "")
                            }
                        })
                    } else {
                        setisEditing(true)
                    }

                }}>
            </ActionButton>
            <InfoModalAuth
                onShow={onShowModal}
                setIsEdtion={() => setisEditing(true)}
                show={showModal}
            />
        </>
    )
}


export default withAuthorization(AccountInfo)

