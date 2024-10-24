import { NavbarMenuToggle } from "@nextui-org/react";
import { memo, useState } from "react";
import MenuModal from "./Modal.menu";

const NavbarMenu = memo(() => {

    const [show, setShow] = useState(false)

    const onShow = () => {
        setShow(prev => !prev)
    }

    return (
        <>
            <NavbarMenuToggle
                data-open={show}
                onClick={() => setShow(true)}
                className="md:hidden h-10 " />
            <MenuModal onShow={onShow} show={show} />
        </>
    )
})

export default NavbarMenu;