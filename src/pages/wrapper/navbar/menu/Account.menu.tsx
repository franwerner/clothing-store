import { Divider, Link } from "@nextui-org/react";
import { memo, ReactNode, useCallback } from "react";
import { Link as LinkDom, useLocation, useNavigate, useNavigation, useSearchParams } from "react-router";

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
   
    const {pathname} = useLocation()

    const onClick = useCallback(onShow, [])

    return (
        <>
            <LinkAccount
                url="/cuenta/ingresar"
                onClick={onClick}
                isActive={pathname.search("cuenta/ingresar") >= 0}>
                Iniciar sesión
            </LinkAccount>
            <Divider
                className="h-10"
                orientation="vertical" />
            <LinkAccount
                url="/cuenta/registrarse"
                onClick={onClick}
                isActive={pathname.search("cuenta/registrarse") >= 0}>
                Crear cuenta
            </LinkAccount>
        </>
    )
};

export default MenuAccount