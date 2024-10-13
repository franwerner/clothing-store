import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"
import { useState } from "react"
import AccountNavBar from "./Account.navbar"
import ShopCartNavbar from "./shopcart"
import ProductSearchNavBar from "./product-search"
import MenuNavBar from "./menu"


const NavBar = () => {

    const [show, setShow] = useState()
    
    return (
        <Navbar
            maxWidth="lg"
            className="h-24 shadow sm:shadow-none">
            <MenuNavBar/>
            <ProductSearchNavBar />
            <NavbarBrand className="justify-center ">
                <img
                    className="w-[100px] select-none "
                    loading="lazy"
                    alt="logo-olga-hats"
                    src="../../assets/olga hats.jpg"
                />
            </NavbarBrand>
            <NavbarContent className=" data-[justify=start]:justify-center">
                <AccountNavBar />
                <ShopCartNavbar />
            </NavbarContent>
        </Navbar>
    )
}

export default NavBar