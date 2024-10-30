import navigationList, { NavigationList } from "@/constant/navigationList.contant";
import useGetMainPaths from "@/hooks/useGetMainPaths.hooks";
import { Link } from "@nextui-org/react";
import { memo, useCallback } from "react";
import { Link as LinkDom } from "react-router-dom";

const Item = memo(({ name, url, index, isActive, setMenu }: NavigationList & { index: number, isActive: boolean, setMenu: () => void }) => {

    return (
        <li className={` 
        ${index < navigationList.length - 1 ? "border-b-1" : ""} 
        `
        }>
            <Link
                as={LinkDom}
                onClick={setMenu}
                to={url}
                className={`text-[16px] flex p-4 items-center gap-5 justify-start bg  text-black cursor-pointer ${isActive ? "text-white font-bold bg-default-800  border-b-default-900 border-b-3 rounded-sm " : "hover:bg-default-200"} uppercase`}
            >
                {name}
            </Link>
        </li>
    )
})


const MenuNavigationItems = ({ onShow }: { onShow: () => void }) => {

    const setMenu = useCallback(onShow, [])

    const key = useGetMainPaths()

    return navigationList.map((props, index) =>
        <Item
            key={props.name}
            isActive={key === props.url}
            setMenu={setMenu}
            index={index}
            {...props} />
    )
}

export default MenuNavigationItems;