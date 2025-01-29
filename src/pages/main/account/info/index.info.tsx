import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import { useSelector } from "@/store"
import classNames from "classnames"
import { useState } from "react"
import withAuthorization from "../components/withAuthorization"
import usePatchUserInfo from "./api/usePatchUserInfo.api"
import useInfoForm from "./hook/useInfoForm.hook"
import InfoList from "./list-info"
import InfoModalAuth from "./ModalAuth.info"

const AccountInfo = () => {
    const [isEditing, setisEditing] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const { isAuthorized, expired_at } = useSelector(({ user }) => user.edit_authorization) || { expired_at: 0, isAuthorized: false }
    const { name = "", lastname = "", phone } = useSelector(({ user }) => user.info) || {}

    const onShowModal = () => setShowModal(prev => !prev)

    const { form, onChange, errors, setForm, changes } = useInfoForm({
        name,
        lastname,
        phone: phone ?? "",
        password: ""
    })

    const { isLoading, setRequest } = usePatchUserInfo(changes.list, () => setForm({ password: "" }))

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
                    "opacity-60 pointer-events-none ": (errors.hasError || !changes.hasChanges) && isEditing,

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
                        setRequest()
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

