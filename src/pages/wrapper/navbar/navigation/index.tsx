import navigationList from "@/constant/navigationList.contant";
import router from "@/router";
import { NavbarContent, Tab, Tabs } from "@nextui-org/react";
import { isString } from "my-utilities";
import { memo } from "react";
import useGetMainPaths from "../hooks/useGetMainPaths.hooks";

const NavbarNavigation = memo(() => {

    const key = useGetMainPaths()
    
    return (
        <NavbarContent
            as="div"
            className="data-[justify=start]:justify-start hidden lg:inline-flex ">
            <Tabs
                as={"ul"}
                selectedKey={key}
                defaultSelectedKey={key}
                onSelectionChange={(url) => {
                    if (isString(url)) router.navigate(url)
                }}
                variant="underlined">
                {navigationList.map(({ name, url }) => {
                    return <Tab
                        as="li"
                        key={url}
                        title={name}
                        className="group [&_span]:pointer-events-none hover:opacity-100 text-[16px] uppercase [&_div]:text-black data-[selected=true]:font-semibold flex flex-col items-center  ">
                    </Tab>
                })}
            </Tabs>
        </NavbarContent>
    )
})

export default NavbarNavigation;