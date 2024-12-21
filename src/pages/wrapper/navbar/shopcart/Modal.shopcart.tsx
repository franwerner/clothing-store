import ActionButton from "@/components/ActionButton";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Link } from "@nextui-org/react";
import { Link as LinkDom } from "react-router";
import ShopCartProducts from "./Products.shopcart";
import ShopCartTotal from "./Total.shopcart";

const ShopcartModal = ({ show, onShow }: { show?: boolean, onShow: () => void }) => {
    return (
        <Drawer
            isOpen={show}
            onOpenChange={onShow}
            backdrop="opaque"
            scrollBehavior="inside"
            >
            <DrawerContent>
                <DrawerHeader>
                    <p className="text-xl sm:text-2xl uppercase font-light ">Carrito de compras</p>
                </DrawerHeader>
                <DrawerBody className="p-2 flex-1  ">
                    <ShopCartProducts />
                </DrawerBody>
                <DrawerFooter className="flex flex-col  justify-start items-center ">
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
                </DrawerFooter>
            </DrawerContent>
        </Drawer >
    );
};

export default ShopcartModal;