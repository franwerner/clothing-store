import router from "@/router";
import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, NavbarItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";
import IconBag from "./IconBag.shopcart";
import Total from "./Total.shopcart";
import ProductsShopcart from "./Products.shopcart";


const ShopCartNavbar = () => {

    const [show, setShow] = useState(false)

    const onShow = () => {
        setShow(prev => !prev)
    }


    return (
        <>
            <NavbarItem className="justify-center  flex items-center">
                <IconBag onShow={onShow} />
            </NavbarItem>
            <Modal
                classNames={{
                    wrapper: "flex justify-end min-h-screen overflow-hidden ",
                    base: "sm:m-0 m-0 min-h-screen rounded-none"
                }}
                isOpen={show}
                onOpenChange={onShow}
                size="lg"
                backdrop="blur"
                placement="top"
                scrollBehavior="inside"
                motionProps={{
                    variants: {
                        enter: {
                            x: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                                type: "spring",
                            },
                        },
                        exit: {
                            x: 50,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                type: "spring",
                                ease: "easeOut",
                            },
                        },
                    }
                }}>
                <ModalContent>
                    <ModalHeader>
                        <p className="text-1xl sm:text-2xl uppercase text-bold text-default-900">Carrito de compras</p>
                    </ModalHeader>
                    <ModalBody className="p-2 flex-1  ">
                        <div className="flex justify-between text-[20px]  border-y-1 px-4 py-2 text-default-800 uppercase font-semibold">
                            <motion.h3
                                initial={{
                                    x: -300
                                }}
                                animate={{
                                    x: 0
                                }}
                                className="font-mono">
                                Producto
                            </motion.h3>
                            <motion.h3
                                initial={{
                                    x: 300
                                }}
                                animate={{
                                    x: 0
                                }}
                                className="font-mono">
                                Subtotal
                            </motion.h3>
                        </div>
                        <ProductsShopcart />
                    </ModalBody>
                    <ModalFooter className="flex flex-col  justify-start items-center ">
                    <Total subtotal={80000} />

                        <Button
                            className="uppercase font-bold w-full text-secondary-400"
                            variant="flat"
                            color="secondary">
                            Iniciar compra
                        </Button>
                        <Link
                            className="underline cursor-pointer text-default-900 font-medium"
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

export default ShopCartNavbar;