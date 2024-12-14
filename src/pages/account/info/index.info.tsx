import useUpdateInfoUser from "@/api/hook/users/account/useUpdateInfo.account"
import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import useForm from "@/hooks/useForm.hook"
import router from "@/router"
import { useSelector } from "@/store"
import removePropertiesByValues from "@/utils/removePropertiesByValues.utilts"
import { isZodErrorResponse } from "@/utils/verifyResponsesData.utilts"
import classNames from "classnames"
import { useLayoutEffect, useState } from "react"
import InfoList from "./List.info"
import InfoModalAuth from "./ModalAuth.info"

const AccountInfo = () => {
    const { expired_at, isAuthorized } = useSelector(({ user }) => user.edit_authorization) || { expired_at: 0, isAuthorized: false }
    const [{ isLoading, response }, { setRequest }] = useUpdateInfoUser()
    const { fullname, phone, email } = useSelector(({ user }) => user.info) || {}
    const { form, onChange, resetForm } = useForm({
        fullname,
        phone,
        password: ""
    })
    const body = removePropertiesByValues(form, [fullname, phone, "", undefined])
    const isContainKeys = Object.keys(body).length > 0
    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    useLayoutEffect(() => {
        if (!email) router.navigate("/cuenta/ingresar")
    }, [])
    const openModalHandler = () => {
        setIsOpen(prev => !prev)
    }
    const editHandler = () => {
        setIsEdit(prev => !prev)
    }

    return (
        <>
            <AnimatedTitle title="Información de la cuenta" />
            {
                isEdit && <span
                onClick={() => {
                    setIsEdit(false)
                }}
                className="material-symbols-outlined absolute hover:scale-90 cursor-pointer right-0 top-12">
                close
            </span>
            }
            <InfoList
                data={isZodErrorResponse(response) ? response.result.data : []}
                onChange={onChange}
                form={form}
                isEdit={isEdit} />
            <ActionButton
                className={classNames(
                    "bg-primary-400", {
                    "bg-success-400": isEdit,
                    "opacity-50  pointer-events-none": !isContainKeys && isEdit
                })}
                isLoading={isLoading}
                onPress={() => {
                    if (isEdit) {
                        setRequest({
                            body,
                            onSuccess: () => {
                                resetForm()
                            }
                        })
                    } else if (Date.now() > expired_at || !isAuthorized) {
                        setIsOpen(true)
                    }
                    else {
                        setIsEdit(true)
                    }
                }}>
                {
                    <p className="flex items-center gap-2">
                        {isEdit ? "Guardar cambios" : "Editar información"}
                        <span className={"material-symbols-outlined"}>
                            {isEdit ? "cloud_upload" : "edit"}
                        </span>
                    </p>
                }

            </ActionButton>
            {
                isOpen && <InfoModalAuth
                    editHandler={editHandler}
                    openModalHandler={openModalHandler} />
            }
        </>
    )
}


export default AccountInfo

