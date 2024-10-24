import navigationList, { NavigationList } from "@/constant/navigationList.contant";
import { Link as L, NavbarContent, NavbarItem } from "@nextui-org/react";
import { memo } from "react";
import { Link, useLocation } from "react-router-dom";

const Items = memo(({ name, url, isActive }: NavigationList & { isActive: boolean }) => {

    return (
        <NavbarItem
            key={url}
            className="group flex flex-col items-center  ">
            <L
                data-is-active={isActive}
                as={Link}
                to={`${url}`}
                className="data-[is-active=true]:font-semibold  cursor-pointer uppercase text-black font-medium">
                {name}
            </L>
            <span
                data-is-active={isActive}
                className="h-[1px] w-0 bg-black data-[is-active=true]:w-full data-[is-active=true]:scale-x-100 group-hover:w-full group-hover:scale-x-100 transition-all duration-200 ease-in-out transform origin-center" />
        </NavbarItem>
    )
})

const NavbarNavigation = memo(() => {

    const { pathname } = useLocation()

    return (
        <NavbarContent className="data-[justify=start]:justify-start hidden md:inline-flex ">
            {
                navigationList.filter(i => i.name !== "envios" && i.name !== "productos").map(i =>
                    <Items key={i.url} isActive={pathname == i.url} {...i} />
                )
            }
        </NavbarContent>
    )
})

export default NavbarNavigation;