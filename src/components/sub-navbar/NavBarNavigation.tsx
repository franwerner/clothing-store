import navigationList, { NavigationList } from "@/constant/navigationList.contant";
import { Link, NavbarContent, NavbarItem } from "@nextui-org/react";
import { memo } from "react";



const Items = memo(({ name, url, icon }: NavigationList) => {
    const currentNavigation = name === "Inicio"
    return (
        <NavbarItem  >
            <Link
                className={`flex flex-col ${currentNavigation ? "text-secondary-400" : "text-default-950"} `}
                href={url}
                style={{
                    fontWeight: currentNavigation ? "600" : "400",
                }}>
                <span
                    className={`material-symbols-outlined text-3xl px-2 py-1 rounded-full ${currentNavigation ? "bg-secondary-50" : "bg-default-50 text-default-700"}`}>
                    {icon}
                </span>
                {name}
            </Link>
        </NavbarItem>
    )
})

const NavBarNavigation = () => {

    return (
        <NavbarContent
            className="flex data-[justify=start]:justify-center w-full hidden sm:flex"
            id="navigation"
        >
            {
                navigationList.map((props) => <Items key={props.name} {...props} />)
            }
        </NavbarContent>
    );
};

export default NavBarNavigation