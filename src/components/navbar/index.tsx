import router from "@/router"
import { Divider, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import imgBrand from "../../../assets/Olga hats.jpg"
import MenuNavBar from "./menu"
import ProductSearchNavBar from "./product-search"
import ShopCartNavbar from "./shopcart"

const NavBar = () => {
    return (
        <Navbar
            maxWidth="lg"
            className="h-24 shadow sm:shadow-none">
            <MenuNavBar />
            <ProductSearchNavBar />
            <NavbarBrand className="justify-center ">
                <img
                    className="w-[100px] select-none "
                    loading="lazy"
                    alt="logo-olga-hats"
                    src={imgBrand}
                />
            </NavbarBrand>
            <NavbarContent className=" data-[justify=start]:justify-center">
                <NavbarItem className="hidden sm:flex">
                    <Link
                        onClick={() => router.navigate("cuenta/register")}
                        color="foreground"
                        className="text-[10px] uppercase cursor-pointer">
                        crear cuenta
                    </Link>
                </NavbarItem>
                <Divider
                    className="h-8 hidden sm:flex "
                    orientation="vertical" />
                <NavbarItem className="hidden sm:flex">
                    <Link
                        onClick={() => router.navigate("cuenta/login")}
                        color="foreground"
                        className="text-[10px] cursor-pointer uppercase">
                        iniciar sesion
                    </Link>
                </NavbarItem>
                <ShopCartNavbar />
            </NavbarContent>
        </Navbar>
    )
}

export default NavBar