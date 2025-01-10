import useUpdateInfoUserAuth from "@/pages/account/info/api/useUpdateInfoAuth.api"
import ActionButton from "@/components/ActionButton"
import BaseInput from "@/components/BaseInput"
import useForm from "@/hooks/useForm.hook"
import { Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react"
import { useSelector } from "@/store"

const InfoModalAuth = () => {
    const { isAuthorized, expired_at } = useSelector(({ user }) => user.edit_authorization) || { expired_at: 0, isAuthorized: false }
    const { form, onChange, setValue } = useForm({ password: "" })
    const { isLoading, response, setRequest } = useUpdateInfoUserAuth(form.password)
    const { code, message } = response.result_error ?? {}

    const authenticate = () => {
        setRequest({
            onSuccess: () => {
                setValue("password", "")
            }
        })
    }

    return (
        <Modal
            placement="center"
            backdrop="opaque"
            hideCloseButton
            classNames={{
                closeButton: "self-end"
            }}
            isOpen={!isAuthorized || Date.now() > expired_at}>
            <ModalContent >
                <ModalBody>
                    <BaseInput
                        onKeyUp={({ key }) => {
                            if (key === "Enter") {
                                authenticate()
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
                        onPress={() => authenticate()}
                        isLoading={isLoading}>
                        Autenticar
                    </ActionButton>
                </ModalFooter>
            </ModalContent>

        </Modal>
    )
}

export default InfoModalAuth