import useShopcartGetSession from "@/api/hook/users/shopcart/useGetSession.shopcart";
import ActionButton from "@/components/ActionButton";
import { isSuccessResponse } from "@/utils/verifyResponsesData.utilts";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Link, Spinner } from "@nextui-org/react";
import { Shopcart } from "clothing-store-shared/types";
import { useEffect } from "react";
import { Link as LinkDom } from "react-router";
import ShopCartProducts from "./Products.shopcart";
import ShopCartTotal from "./Total.shopcart";


const ShopcartModal = ({ show, onShow }: { show?: boolean, onShow: () => void }) => {

    const [{ isLoading }, { setRequest }] = useShopcartGetSession()

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
                <DrawerHeader>
                    <p className="text-xl sm:text-2xl uppercase font-light ">Carrito de compras</p>
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
                    <ActionButton className="w-full">
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