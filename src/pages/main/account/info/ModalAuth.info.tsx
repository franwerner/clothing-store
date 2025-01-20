import ActionButton from "@/components/ActionButton"
import BaseInput from "@/components/BaseInput"
import useForm from "@/hooks/useForm.hook"
import { Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react"
import usePostUserInfoAuthentication from "./api/usePostUserInfoAuthentication.api"

const InfoModalAuth = ({ show, onShow,setIsEdtion }: { show: boolean, onShow: () => void,setIsEdtion:() => void }) => {
    const { form, onChange, setValue } = useForm({ password: "" })
    const { isLoading, response, setRequest } = usePostUserInfoAuthentication(form.password)
    const { code, message } = response.result_error ?? {}

    const authenticate = () => {
        setRequest({
            onSuccess: () => {
                setValue((prev) => ({ ...prev, password: "" }))
                onShow()
                setIsEdtion()
            }
        })
    }

    return (
        <Modal
            placement="center"
            classNames={{
                closeButton: "self-end"
            }}
            onOpenChange={onShow}
            isOpen={show}>
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