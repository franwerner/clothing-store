import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"
import { useState } from "react"
import NavBarShopCart from "./NavBarShopCart"
import NavBarNavigationMenu from "./NavBarNavigationMenu"
import NavBarAccount from "./NavBarAccount"
import NavBarSearch from "./navbar-search"


const NavBar = () => {

    const [show, setShow] = useState()
    
    return (
        <Navbar
            maxWidth="lg"
            className="h-24 shadow sm:shadow-none">
            <NavBarNavigationMenu />
            <NavBarSearch />
            <NavbarBrand className="justify-center ">
                <img
                    className="w-[100px] select-none "
                    loading="lazy"
                    alt="logo-olga-hats"
                    src="../../assets/olga hats.jpg"
                />
            </NavbarBrand>
            <NavbarContent className=" data-[justify=start]:justify-center">
                <NavBarAccount />
                <NavBarShopCart />
            </NavbarContent>
        </Navbar>
    )
}

export default NavBar