import useShopcartGetSession from "@/api/hook/users/shopcart/useGetSession.shopcart";
import ActionButton from "@/components/ActionButton";
import { useSelector } from "@/store";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Link, Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { Link as LinkDom } from "react-router";
import ShopCartProducts from "./Products.shopcart";
import ShopCartTotal from "./Total.shopcart";
import router from "@/router";
import ShopcartExpiredCounter from "@/components/ShopcartExpiredCounter";

const ShopcartModal = ({ show, onShow }: { show?: boolean, onShow: () => void }) => {

    const [{ isLoading }, { setRequest }] = useShopcartGetSession()

    const expired_at = useSelector(({ shopcart }) => shopcart.expired_at)

    useEffect(() => {
        if (show) {
            setRequest()
        }
    }, [show])

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
                        onPress={() => {
                            router.navigate("/cuenta/orden-transaccion")
                            onShow()
                        }}
                        isDisabled={expired_at === 0}
                        className="w-full">
                        Iniciar compra
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