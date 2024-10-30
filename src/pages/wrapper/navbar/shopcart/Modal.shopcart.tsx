import { Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import ShopCartProducts from "./Products.shopcart";
import ShopCartTotal from "./Total.shopcart";
import ActionButton from "@/components/ActionButton";
import { Link as LinkDom } from "react-router-dom"

const ShopcartModal = ({ show, onShow }: { show?: boolean, onShow: () => void }) => {
    return (
        <Modal
            classNames={{
                wrapper: "flex justify-end  ",
                base: "sm:m-0 m-0  min-h-dvh rounded-none",

            }}
            isOpen={show}
            onOpenChange={onShow}
            size="lg"
            backdrop="opaque"
            placement="top"
            scrollBehavior="inside"
            motionProps={{
                variants: {
                    enter: {
                        opacity: 1,
                        transition: {
                            duration: 0.1,
                            ease: "easeInOut",
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
            }}>
            <ModalContent>
                <ModalHeader>
                    <p className="text-xl sm:text-2xl uppercase font-light ">Carrito de compras</p>
                </ModalHeader>
                <ModalBody className="p-2 flex-1  ">
                    <ShopCartProducts />
                </ModalBody>
                <ModalFooter className="flex flex-col  justify-start items-center ">
                    <ShopCartTotal />
                    <ActionButton className="w-full">
                        Iniciar compra
                    </ActionButton>
                    <Link
                        as={LinkDom}
                        to={"/productos"}
                        color="foreground"
                        className="underline  cursor-pointer  font-medium"
                        onClick={() => {
                            onShow()
                        }}>
                        Ver  productos disponibles.
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
};

export default ShopcartModal;