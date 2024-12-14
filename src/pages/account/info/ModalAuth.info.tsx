import useUpdateInfoUserAuth from "@/api/hook/users/account/useUpdateInfoAuth.account"
import ActionButton from "@/components/ActionButton"
import BaseInput from "@/components/BaseInput"
import useForm from "@/hooks/useForm.hook"
import { Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react"

interface InfoModalAuthProps {
    openModalHandler: () => void
    editHandler: () => void
}

const InfoModalAuth = ({
    openModalHandler,
    editHandler
}: InfoModalAuthProps) => {

    const { form, onChange } = useForm({ password: "" })
    const [{ isLoading, response }, { setRequest }] = useUpdateInfoUserAuth(form.password)

    const { code, message } = response.result

    return (
        <Modal
            placement="center"
            backdrop="opaque"
            classNames={{
                closeButton: "self-end"
            }}
            onClose={openModalHandler}
            isOpen>
            <ModalContent className="">
                <ModalBody>
                    <BaseInput
                        onKeyUp={({ key }) => {
                            if (key === "Enter") {
                                setRequest({
                                    onSuccess : () => {
                                        openModalHandler()
                                        editHandler()
                                    }
                                })
                            }
                        }}
                        onChange={onChange}
                        name="password"
                        autoComplete="current-password"
                        labelPlacement="inside"
                        isInvalid={code == "wrong_password"}
                        errorMessage={message}
                        value={form.password}
                        label="contraseña"
                        type="password"
                    />
                    <span className="text-[12px]  font-semibold">* Para continuar, debes verificar que eres el propietario de la cuenta.</span>
                </ModalBody>
                <ModalFooter className="p-1 pb-4">
                    <ActionButton
                        onClick={() => setRequest()}
                        isLoading={isLoading}>
                        Validar actualización
                    </ActionButton>
                </ModalFooter>
            </ModalContent>

        </Modal>
    )
}

export default InfoModalAuth