import { Divider, Link, NavbarItem } from "@nextui-org/react";

const NavBarAccount = () => {
    return (
        <>
            <NavbarItem className="hidden sm:flex">
                <Link
                    color="foreground"
                    className="text-[10px] uppercase cursor-pointer">
                    crear cuenta
                </Link>
            </NavbarItem>
            <Divider className="h-8 hidden sm:flex " orientation="vertical" />
            <NavbarItem className="hidden sm:flex">
                <Link color="foreground" className="text-[10px] cursor-pointer uppercase">
                    iniciar sesion
                </Link>
            </NavbarItem>
        </>
    );
};

export default NavBarAccount;