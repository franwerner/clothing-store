import { Modal, ModalBody, ModalContent } from "@nextui-org/react";

const ClientDirectionModal = ({ onShow, show }: { show: boolean, onShow: () => void }) => {
    return (
        <Modal
            size="3xl"
            placement="center"
            isOpen={show}
            onOpenChange={onShow}
        >
            <ModalContent>
                <ModalBody>
                    ACA VA A IR EL TEMA DEL CODIGO POSTAL
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ClientDirectionModal