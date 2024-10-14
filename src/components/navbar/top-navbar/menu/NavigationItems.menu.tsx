import navigationList, { NavigationList } from "@/constant/navigationList.contant";
import router from "@/router";
import { Link } from "@nextui-org/react";
import { memo, useCallback } from "react";
import { useLocation } from "react-router-dom";

const Item = memo(({ name, url, icon, index, isActive, setMenu }: NavigationList & { index: number, isActive: boolean, setMenu: () => void }) => {

    return (
        <li className={` ${index >= navigationList.length - 1 ? "" : "border-b-1"}`}>
            <Link
                onClick={() => {
                    router.navigate(url)
                    setMenu()
                }}
                className={`text-[16px] flex p-3 items-center gap-5 justify-start font-semibold cursor-pointer ${isActive ? "text-secondary-400" : "text-default-600 "} uppercase`}
            >
                {name}
                <span className={`material-symbols-outlined text-2xl px-2 p-1 rounded-full ${isActive ? "bg-secondary-50  text-secondary-400 " : "bg-default-50"} `}>
                    {icon}
                </span>
            </Link>
        </li>
    )
})


const MenuNavigationItems = ({ onShow }: { onShow: () => void }) => {

    const pathname = useLocation().pathname

    const setMenu = useCallback(onShow, [])

    return navigationList.map((props, index) =>
        <Item
            key={props.name}
            isActive={pathname === props.url}
            setMenu={setMenu}
            index={index}
            {...props} />
    )
}

export default MenuNavigationItems;