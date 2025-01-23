import useShopcartGetSession from "@/api/shopcart/useGetSession.api";
import ActionButton from "@/components/ActionButton";
import ShopcartExpiredCounter from "@/containers/ShopcartExpiredCounter.containers";
import router from "@/router";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Link, Spinner } from "@nextui-org/react";
import { Link as LinkDom } from "react-router";
import ShopCartProducts from "./Products.shopcart";
import ShopCartTotal from "./Total.shopcart";

const ShopcartModal = ({ show, onShow }: { show?: boolean, onShow: () => void }) => {

    const { isLoading, setRequest } = useShopcartGetSession()

    return (
        <Drawer
            isOpen={show}
            onOpenChange={onShow}
            backdrop="opaque"
            size="xl"
            motionProps={{
                onViewportEnter: () => setRequest()
            }}
            scrollBehavior="inside"
        >
            <DrawerContent>
                <DrawerHeader className="flex-col">
                    <p className="text-xl sm:text-2xl uppercase font-light ">Carrito de compras</p>
                    {!isLoading && <ShopcartExpiredCounter />}
                </DrawerHeader>
                <DrawerBody className="p-2 flex-1 ">
                    {
                        isLoading ? <Spinner color="secondary" className="h-full" /> : <ShopCartProducts />
                    }
                </DrawerBody>
                <DrawerFooter className="flex flex-col  justify-start items-center ">
                    {
                        !isLoading && <ShopCartTotal />
                    }
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