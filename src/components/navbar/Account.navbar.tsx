import router from "@/router";
import { Divider, Link, NavbarItem } from "@nextui-org/react";

const AccountNavBar = () => {
    return (
        <>
            <NavbarItem className="hidden sm:flex">
                <Link
                    onClick={() => router.navigate("cuenta/register")}
                    color="foreground"
                    className="text-[10px] uppercase cursor-pointer">
                    crear cuenta
                </Link>
            </NavbarItem>
            <Divider
                className="h-8 hidden sm:flex "
                orientation="vertical" />
            <NavbarItem className="hidden sm:flex">
                <Link
                    onClick={() => router.navigate("cuenta/login")}
                    color="foreground"
                    className="text-[10px] cursor-pointer uppercase">
                    iniciar sesion
                </Link>
            </NavbarItem>
        </>
    );
};

export default AccountNavBar;