import navigationList, { NavigationList } from "@/constant/navigationList.contant";
import { Button, Divider, Link, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";

const Items = ({ name, url,icon, index }: NavigationList & { index: number }) => {
    const current = name == "Inicio"
    return (
        <NavbarMenuItem className={` ${index >= navigationList.length - 1 ? "" : "border-b-1"}`}>
            <Link
                className={`text-[15px] flex p-2 items-center gap-5 justify-start font-semibold ${current ? "text-secondary-400" : "text-default-600 "} uppercase`}
                href={url}>
                {name}
                <span className={`material-symbols-outlined text-2xl px-2 p-1 rounded-full ${current ? "bg-secondary-50  text-secondary-400 " : "bg-default-50"} `}>
                 {icon}
                </span>
            </Link>
        </NavbarMenuItem>
    )
}

const NavBarNavigationMenu = () => {
    return (
        <>
            <NavbarMenuToggle className="sm:hidden" />
            <NavbarMenu className="z-50 top-[100px] p-1">

                {
                    navigationList.map((props, index) =>
                        <Items
                            key={props.name}
                            index={index}
                            {...props} />
                    )
                }
                <NavbarMenuItem className=" flex-1 flex items-end mb-[36px] justify-center ">
                    <div style={{ height: "min-content" }} className="flex gap-3 uppercase  justify-center items-end w-screen border-t-1 p-1">
                        <Button color="success" className="p-[21px] px-2" variant="flat">
                            <Link className="text-success-400 font-medium uppercase">
                                Crear cuenta
                            </Link>
                        </Button>
                        <Divider orientation="vertical" className="h-12" />
                        <Button color="secondary" className="p-[21px] px-2 " variant="flat">
                            <Link className="text-secondary-400 font-medium uppercase">
                                Iniciar sesion
                            </Link>
                        </Button>
                    </div>
                </NavbarMenuItem>
            </NavbarMenu>
        </>
    );
};

export default NavBarNavigationMenu;