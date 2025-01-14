import usePatchUserAddress from "@/api/user-address/usePatchUserAddress.api";
import usePostUserAddress from "@/api/user-address/usePostUserAddress.api";
import { useSelector } from "@/store";
import { Button, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { userAddresessSchema, UserAddresessSchema } from "clothing-store-shared/schema";
import { useState } from "react";
import AccountDirectionForm from "./Form.account-direction";
import DirectionFormSelectItems from "./select-direction";
import useDirectionForm, { DirectionForm } from "./hooks/useDirectionForm.hooks";
import ActionButton from "@/components/ActionButton";


const AccountDirectionModal = ({ onShow, show }: { show: boolean, onShow: () => void }) => {
    const post = usePostUserAddress()
    const patch = usePatchUserAddress()
    const address = useSelector(({ userAddress }) => userAddress.address) || {} as UserAddresessSchema.Base
    const user_address_id = address?.user_address_id
    const { form, onChange, setValue, changes } = useDirectionForm(address)
    const { isEmpty, list } = changes
    const [errors, setErrors] = useState<Partial<Record<keyof DirectionForm, string[]>>>({})
    
    const submitHandler = () => {
        const error = userAddresessSchema.update.omit({ user_fk: true, user_address_id: true }).safeParse(form).error
        if (error) return setErrors(error.formErrors.fieldErrors)
        if (!user_address_id) return post.setRequest({ body: form })
        if (isEmpty) return
        /**
         * Se envia la provincia siempre y cuando la localidad se cambie.
         * Debido a que se necesita la provincia para verificar que la localidad sea compatible.
         */
        patch.setRequest({
            body: {
                ...list,
                user_address_id,
                province: list.locality && form.province,
            }
        })
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

                    <DirectionFormSelectItems
                        setValue={setValue}
                        locality={form.locality}
                        province={form.province}
                        locality_error={errors.locality}
                        province_error={errors.province}
                    />
                    <AccountDirectionForm
                        errors={errors}
                        onChange={onChange}
                        form={form}
                    />
               
                    <ActionButton
                        onPress={() => {
                            submitHandler()
                        }}
                        isLoading={patch.isLoading || post.isLoading}
                        isDisabled={isEmpty}
                        className={"font-medium   uppercase text-md xs:max-w-[300px] !w-full m-auto h-[56px]"}>
                        {user_address_id ? "Guardar cambios" : "Crear direccion "}
                    </ActionButton>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export {
    type DirectionForm
};
export default AccountDirectionModal