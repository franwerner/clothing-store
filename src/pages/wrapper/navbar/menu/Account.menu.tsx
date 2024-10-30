import { Divider, Link } from "@nextui-org/react";
import { memo, ReactNode, useCallback } from "react";
import { Link as LinkDom, useSearchParams } from "react-router-dom";

const LinkAccount = memo(({ url, children, isActive, onClick }: { url: string, children: ReactNode, isActive: Boolean, onClick: () => void }) => (
    <Link
        onClick={onClick}
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

const MenuAccount = ({ onShow }: { onShow: () => void }) => {

    const [params] = useSearchParams()

    const onClick = useCallback(onShow, [])

    const form = params.get("form")
    return (
        <>
            <LinkAccount
                url="/cuenta?form=login"
                onClick={onClick}
                isActive={form == "login"}>
                Iniciar sesión
            </LinkAccount>
            <Divider
                className="h-10"
                orientation="vertical" />
            <LinkAccount
                url="/cuenta?form=register"
                onClick={onClick}
                isActive={form == "register"}>
                Crear cuenta
            </LinkAccount>
        </>
    )
};

export default MenuAccount