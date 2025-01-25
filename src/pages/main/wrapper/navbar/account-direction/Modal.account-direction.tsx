import usePatchUserAddress from "@/api/user-address/usePatchUserAddress.api";
import usePostUserAddress from "@/api/user-address/usePostUserAddress.api";
import ActionButton from "@/components/ActionButton";
import { useSelector } from "@/store";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { UserAddressesSchema } from "clothing-store-shared/schema";
import AccountDirectionForm from "./Form.account-direction";
import useDirectionForm, { DirectionForm } from "./hooks/useDirectionForm.hooks";

const AccountDirectionModal = ({ onShow, show }: { show: boolean, onShow: () => void }) => {
    const post = usePostUserAddress()
    const patch = usePatchUserAddress()
    const address = useSelector(({ userAddress }) => userAddress.address) || {} as UserAddressesSchema.Base
    const user_address_id = address?.user_address_id
    const { form, onChange, setForm, errors, changes, handlerValidationForm } = useDirectionForm(address)
    const { hasError, list } = errors
    const submitHandler = () => {
        if (hasError) return
        if (user_address_id) {
            patch.setRequest({
                body: {
                    ...changes.list,
                    user_address_id,
                }
            })
        } else {
            const { setErrors, hasError } = handlerValidationForm()
            if (hasError) return setErrors()
            post.setRequest({
                body: form
            })
        }
    }

    return (
        <Modal
            size="3xl"
            placement="top"
            isOpen={show}
            onOpenChange={onShow}
        >
            <ModalContent >
                <ModalHeader className="flex-col border-b mx-2 uppercase">
                    Configura tu direccion
                </ModalHeader>
                <ModalBody className="min-h-[300px]  grid gap-3 ">
                    <AccountDirectionForm
                        setForm={setForm}
                        errors={list}
                        onChange={onChange}
                        form={form}
                    />

                    <ActionButton
                        onPress={() => {
                            submitHandler()
                        }}
                        isLoading={patch.isLoading || post.isLoading}
                        isDisabled={hasError || changes.notChanges}
                        className={"font-medium   uppercase text-md xs:max-w-[300px] !w-full m-auto h-[56px]"}>
                        {user_address_id ? "Guardar cambios" : "Crear direccion "}
                    </ActionButton>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export {
    type DirectionForm
};
export default AccountDirectionModal