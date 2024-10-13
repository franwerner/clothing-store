import { Modal, ModalBody, ModalContent, ModalHeader, NavbarItem } from "@nextui-org/react";
import { useState } from "react";
import IconBag from "./IconBag.shopcart";
import Product, { ProductProps } from "./Product.shopcart";

const productTest: Array<ProductProps> = Array.from<ProductProps,ProductProps>({ length: 15 },() => {
    return {
        url: "https://acdn.mitiendanube.com/stores/001/874/631/products/1080x1080-421-26a776f1c63a0e562516481597741027-480-0.webp",
        name: "Zapatillas negras con plantilla asdasdasd",
        discount: 20,
        price: 70000,
        id: Math.random()
    }
})


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
                    base: "sm:m-0  min-h-screen rounded-none"
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
                                ease: "easeOut",
                            },
                        },
                    }
                }}>
                <ModalContent>
                    <ModalHeader>
                        <p className="text-2xl uppercase text-bold text-default-900 ">Carrito de compras</p>
                    </ModalHeader>
                    <ModalBody className="p-2">
                        <div className="flex justify-between text-[20px]  border-y-1 px-4 py-2 text-default-800 uppercase font-semibold">
                            <h3 className="font-mono">Producto</h3>
                            <h3 className="font-mono">Subtotal</h3>
                        </div>
                        {
                            productTest.map((props,index) => <Product key={props.id} index={index + 1}  {...props} />)
                        }
                        <div>dfdfdf</div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ShopCartNavbar;