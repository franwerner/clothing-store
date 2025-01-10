import ActionButton from "@/components/ActionButton";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import FormAccountDirection from "./form.account-direction";

const ClientDirectionModal = ({ onShow, show }: { show: boolean, onShow: () => void }) => {

    const [showForm, setShowForm] = useState(true)

    return (
        <Modal
            size="3xl"
            placement="top"
            isOpen={false}
            onOpenChange={onShow}
        >
            <ModalContent >
                <ModalHeader className="flex-col border-b mx-2 uppercase">
                    Configura tu direccion para recibir pedidos.
                </ModalHeader>
                <ModalBody className="min-h-[300px] justify-center">
                    {
                        !showForm && <ActionButton onPress={() => setShowForm(true)} >
                            Cargar Nueva direccion
                        </ActionButton>
                    }
                    {
                        showForm && <FormAccountDirection />
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ClientDirectionModal