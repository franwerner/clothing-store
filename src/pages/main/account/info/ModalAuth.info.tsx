import ActionButton from "@/components/ActionButton"
import useForm from "@/hooks/useForm.hook"
import { Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react"
import usePostUserInfoAuthentication from "./api/usePostUserInfoAuthentication.api"
import InputBase from "@/containers/form-base/InputBase"

const InfoModalAuth = ({ show, onShow, setIsEdtion }: { show: boolean, onShow: () => void, setIsEdtion: () => void }) => {
    const { form, onChange, setValue } = useForm({ password: "" })
    const { isLoading, response, setRequest } = usePostUserInfoAuthentication(form.password,
        () => {
            setValue((prev) => ({ ...prev, password: "" }))
            onShow()
            setIsEdtion()
        })
    const { code, message } = response.result_error ?? {}

    return (
        <Modal
            placement="center"
            classNames={{
                closeButton: "top-0 right-0"
            }}
            onOpenChange={onShow}
            isOpen={show}>
            <ModalContent >

                <ModalBody className="pt-8" >
                    <InputBase
                        onKeyUp={({ key }) => {
                            if (key === "Enter") {
                                setRequest()
                            }
                        }}
                        onChange={onChange}
                        name="password"
                        isInvalid={code == "wrong_password"}
                        errorMessage={message}
                        value={form.password}
                        label="Contraseña"
                        type="password"
                    />
                    <span className="text-[12px]  font-semibold">* Para continuar, debes verificar que eres el propietario de la cuenta.</span>
                </ModalBody>
                <ModalFooter className="p-1 pb-4">
                    <ActionButton
                        onPress={() => setRequest()}
                        isLoading={isLoading}>
                        Autenticar
                    </ActionButton>
                </ModalFooter>
            </ModalContent>

        </Modal>
    )
}

export default InfoModalAuth