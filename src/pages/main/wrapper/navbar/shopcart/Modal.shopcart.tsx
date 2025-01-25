import ActionButton from "@/components/ActionButton";
import Shopcart from "@/containers/shopcart";
import ShopcartExpiredCounter from "@/containers/ShopcartExpiredCounter.containers";
import router from "@/router";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Link } from "@nextui-org/react";
import { Link as LinkDom } from "react-router";

const ShopcartModal = ({ show, onShow }: { show?: boolean, onShow: () => void }) => {

    return (
        <Drawer
            isOpen={show}
            onOpenChange={onShow}
            backdrop="opaque"
            size="xl"
            scrollBehavior="inside"
        >
            <DrawerContent>
                <DrawerHeader className="flex-col">
                    <p className="text-xl sm:text-2xl uppercase font-light ">Carrito de compras</p>
                    <ShopcartExpiredCounter />
                </DrawerHeader>
                <DrawerBody className="p-2">
                   <Shopcart className="flex flex-col h-full"/>
                </DrawerBody>
                <DrawerFooter className="flex flex-col  justify-start items-center ">
                    <ActionButton
                        onPress={() => router.navigate("/pago")}>
                        Finalizar compra
                    </ActionButton>
                    <Link
                        as={LinkDom}
                        to={"/productos"}
                        color="foreground"
                        className="underline  cursor-pointer  font-medium"
                        onPress={() => {
                            onShow()
                        }}>
                        Ver  productos disponibles.
                    </Link>
                </DrawerFooter>
            </DrawerContent>
        </Drawer >
    )
}

export default ShopcartModal