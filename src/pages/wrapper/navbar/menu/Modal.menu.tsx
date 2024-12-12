import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import MenuNavigationItems from "./NavigationItems.menu";
import MenuAccount from "./Account.menu";
import { useQueryLg } from "@/hooks/useQuery.hook";
import useOptimizationModal from "@/hooks/useOptimizationModal.hook";

const MenuModal = ({ onShow, show }: { onShow: () => void, show: boolean }) => {
    const matches = useQueryLg().matches
    useOptimizationModal(show)

    return (
        <Modal
            isOpen={show && !matches}
            onOpenChange={onShow}
            backdrop="opaque"
            placement="top"
            scrollBehavior="inside"
            classNames={{
                wrapper: "flex justify-start ",
                base: "sm:m-0 m-0  min-h-dvh rounded-none",
            }}
            motionProps={{
                variants: {
                    enter: {
                        opacity: 1,
                        transition: {
                            duration: 0.1,
                            ease: "easeInOut",
                            delay: 0.1
                        },
                    },
                    exit: {
                        opacity: 0,
                        transition: {
                            duration: 0.1,
                            ease: "easeInOut",
                        },
                    },
                }
            }}
        >
            <ModalContent className="overflow-hidden">
                <ModalHeader className="font-light uppercase  text-2xl  p-5 mx-2">
                    Menu de navegacion
                </ModalHeader>
                <ModalBody className="mx-1 border-y-1 p-1">
                    <ul className="grid gap-2">
                        <MenuNavigationItems onShow={onShow} />
                    </ul>
                </ModalBody>
                <ModalFooter className="flex xs:gap-5 uppercase font-medium   p-2 justify-center items-center" >
                    <MenuAccount onShow = {onShow} />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default MenuModal