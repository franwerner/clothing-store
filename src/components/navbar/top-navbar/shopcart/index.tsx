import useOptimizationModal from "@/hooks/useOptimizationModal";
import router from "@/router";
import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, NavbarItem } from "@nextui-org/react";
import { useState } from "react";
import ShopCartIcon from "./Icon.shopcart";
import ShopCartProducts from "./Products.shopcart";
import ShopCartTotal from "./Total.shopcart";


const TopNavbarShopCart = () => {

    const [show, setShow] = useState(false)

    const onShow = () => {
        setShow(prev => !prev)
    }

    useOptimizationModal(show)

    return (
        <>
            <NavbarItem className="justify-center  flex items-center">
                <ShopCartIcon onShow={onShow} />
            </NavbarItem>
            <Modal
                classNames={{
                    wrapper: "flex justify-end  ",
                    base: "sm:m-0 m-0 min-h-dvh rounded-none",

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
                        <p className="text-1xl sm:text-2xl uppercase font-oswald text-bold text-default-700">Carrito de compras</p>
                    </ModalHeader>
                    <ModalBody className="p-2 flex-1  ">
                        <div className="flex justify-between text-[20px]  border-y-1 px-4 py-2 text-default-700 uppercase font-semibold">
                            <h3
                                className="font-mono">
                                Producto
                            </h3>
                            <h3
                                className="font-mono">
                                Subtotal
                            </h3>
                        </div>
                        <ShopCartProducts />
                    </ModalBody>
                    <ModalFooter className="flex flex-col  justify-start items-center ">
                        <ShopCartTotal subtotal={95000} />
                        <Button
                            className="uppercase font-bold w-full text-secondary-400"
                            variant="flat"
                            color="secondary">
                            Iniciar compra
                        </Button>
                        <Link
                            className="underline  cursor-pointer text-default-900 font-medium"
                            onClick={() => {
                                router.navigate("/productos")
                                onShow()
                            }}>
                            Ver  productos disponibles.
                        </Link>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    );
};

export default TopNavbarShopCart;