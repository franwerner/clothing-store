import { Divider, Link } from "@nextui-org/react";
import { memo, ReactNode } from "react";
import { Link as LinkDom, useLocation } from "react-router-dom";

const LinkAccount = memo(({ url, children, isActive }: { url: string, children: ReactNode, isActive: Boolean }) => (
    <Link
        className={`
              text-center p-2 text-md sm:p-3 sm:text-lg rounded-sm
            ${isActive ? "bg-default-800 border-b-3 cursor-pointer border-default-900 text-white " : "text-black hover:bg-default-200"}
            `}
        color="foreground"
        as={LinkDom}
        to={url}
    >
        {children}
    </Link>
))

const MenuAccount = () => {

    const { pathname } = useLocation()

    return (
        <>
            <LinkAccount url="/cuenta/sesion" isActive={pathname == "/cuenta/sesion"}>Iniciar sesión</LinkAccount>
            <Divider
                className="h-10"
                orientation="vertical" />
            <LinkAccount url="/cuenta/crear" isActive={true}>Crear cuenta</LinkAccount>
        </>
    )
};

export default MenuAccount