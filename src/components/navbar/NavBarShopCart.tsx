import { Badge, Modal, ModalBody, ModalContent, ModalHeader, NavbarItem } from "@nextui-org/react";
import { useState } from "react";


const IconCart = ({ onShow }: { onShow: () => void }) => (
    <div onClick={onShow} className="relative flex justify-center items-center cursor-pointer flex-col" >
        <Badge
            content="(5)"
            className="font-bold border-1  bg-white"
            variant="solid"
        >
            <span
                className="material-symbols-outlined  text-default-900 text-3xl sm:text-2xl">
                local_mall
            </span>
        </Badge>
    </div>
)

const NavBarShopCart = () => {

    const [show, setShow] = useState(false)

    const onShow = () => {
        setShow(prev => !prev)
    }

    return (
        <>
            <NavbarItem className="justify-center flex items-center">
                <IconCart onShow={onShow} />
            </NavbarItem>
            <Modal
                onOpenChange={onShow}
                size="3xl"
                placement="top"
                scrollBehavior="inside"
                isOpen={show}>
                <ModalContent>
                    <ModalHeader>
                        <p className="text-2xl uppercase text-bold text-default-900 ">Carrito de compras</p>
                    </ModalHeader>
                    <ModalBody className="overflow-scroll"  >
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default NavBarShopCart;