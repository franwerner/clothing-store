import { Button, Divider, Link, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import NavigationItems from "./NavigationItems.menu";
import router from "@/router";


const MenuNavBar = () => {
    return (
        <>
            <NavbarMenuToggle className="sm:hidden" />
            <NavbarMenu className="z-50 top-[100px] p-1">
                <NavigationItems />
                <NavbarMenuItem className=" flex-1 flex items-end mb-[36px] justify-center ">
                    <div
                        style={{ height: "min-content" }}
                        className="flex gap-3 uppercase  justify-center items-end w-screen border-t-1 p-1">
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
                    </div>
                </NavbarMenuItem>
            </NavbarMenu>
        </>
    )
}

export default MenuNavBar;