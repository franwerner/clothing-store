import navigationList, { NavigationList } from "@/constant/navigationList.contant";
import router from "@/router";
import { Link, NavbarMenuItem } from "@nextui-org/react";
import { memo } from "react";
import { useLocation } from "react-router-dom";

const Item = memo(({ name, url, icon, index, isActive }: NavigationList & { index: number, isActive: boolean }) => {

    return (
        <NavbarMenuItem className={` ${index >= navigationList.length - 1 ? "" : "border-b-1"}`}>
            <Link
                onClick={() => router.navigate(url)}
                className={`text-[15px] flex p-2 items-center gap-5 justify-start font-semibold cursor-pointer ${isActive ? "text-secondary-400" : "text-default-600 "} uppercase`}
            >
                {name}
                <span className={`material-symbols-outlined text-2xl px-2 p-1 rounded-full ${isActive ? "bg-secondary-50  text-secondary-400 " : "bg-default-50"} `}>
                    {icon}
                </span>
            </Link>
        </NavbarMenuItem>
    )
})


const NavigationItems = () => {

    const pathname = useLocation().pathname

    return navigationList.map((props, index) =>
        <Item
            key={props.name}
            isActive = {pathname === props.url}
            index={index}
            {...props} />
    )
};

export default NavigationItems;