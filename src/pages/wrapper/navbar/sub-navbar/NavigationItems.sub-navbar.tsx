import navigationList, { NavigationList } from "@/constant/navigationList.contant";
import router from "@/router";
import { Link, NavbarContent } from "@nextui-org/react";
import { motion } from "framer-motion";
import { memo } from "react";
import { useLocation } from "react-router-dom";

const Items = memo(({ name, url, icon, isActive }: NavigationList & { isActive: boolean }) => {

    const responsiveItems = ["Inicio", "Productos"].includes(name)
    const responsiveItemsSm = ["Envios"].includes(name)

    return (
        <motion.li
            layout
            className={` ${responsiveItems ? "flex" : "hidden"} ${responsiveItemsSm ? "xs:flex" : ""} md:flex `}>
            <Link
                onClick={() => router.navigate(url)}
                className={`flex cursor-pointer flex-col  ${isActive ? "text-secondary-400" : "text-default-950"} `}
                style={{
                    fontWeight: isActive ? "600" : "400",
                }}>
                <span
                    className={`material-symbols-outlined text-3xl  px-2 py-1 rounded-full ${isActive ? "bg-secondary-50 " : "bg-default-50 text-default-700"}`}>
                    {icon}
                </span>
                {name}
            </Link>
        </motion.li>
    )
})

const SubNavbarNavigationItems = () => {

    const pathname = useLocation().pathname


    return (
        <NavbarContent
            className="flex data-[justify=start]:justify-center w-min max-h-[68px] sm:flex"
            id="navigation"
        >
            {
                navigationList.map((props) => <Items key={props.name} isActive={props.url == pathname} {...props} />)
            }
        </NavbarContent>
    );
};

export default SubNavbarNavigationItems