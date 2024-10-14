import useOptimizationModal from "@/hooks/useOptimizationModal";
import { Button, Divider, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, NavbarMenuToggle } from "@nextui-org/react";
import { useState } from "react";
import MenuNavigationItems from "./NavigationItems.menu";
import router from "@/router";


const TopNavbarMenu = () => {

    const [show, setShow] = useState(false)

    useOptimizationModal(show)

    const onShow = () => {
        setShow(prev => !prev)
    }

    return (
        <>
            <NavbarMenuToggle data-open={show} onClick={() => setShow(true)} className="sm:hidden h-10" />
            <Modal
                isOpen={show}
                onOpenChange={onShow}
                backdrop="opaque"
                placement="top"
                scrollBehavior="inside"
                classNames={{
                    wrapper: "flex justify-start ",
                    base: "sm:m-0 m-0 min-h-dvh rounded-none",
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
                    <ModalHeader className="font-bold uppercase text-default-700 font-Oswald text-2xl border-b-1 p-5 mx-2">
                        Holga Hat's
                    </ModalHeader>
                    <ModalBody className="mx-1 p-1">
                        <ul>
                            <MenuNavigationItems onShow={onShow} />
                        </ul>
                    </ModalBody>
                    <ModalFooter className="flex xs:gap-5 border-1 p-2 justify-center items-center" >
                        <Button
                            color="success"
                            className="p-[21px] px-2"
                            variant="flat">
                            <Link
                                onClick={() => router.navigate("/cuenta/register")}
                                className="text-success-400 font-medium uppercase">
                                Crear cuenta
                            </Link>
                        </Button>
                        <Divider
                            orientation="vertical"
                            className="h-12" />
                        <Button
                            color="secondary"
                            className="p-[21px] px-2 "
                            variant="flat">
                            <Link
                                onClick={() => router.navigate("/cuenta/login")}
                                className="text-secondary-400 font-medium uppercase">
                                Iniciar sesion
                            </Link>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TopNavbarMenu;