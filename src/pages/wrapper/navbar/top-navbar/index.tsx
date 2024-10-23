import { Divider, Link, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import router from "@/router"
import imgBrand from "@assets/Olga hats.jpg"
import TopNavbarShopCart from "./shopcart"
import TopNavbarProductSearch from "./product-search"
import TopNavbarMenu from "./menu"

const TopNavBar = () => {
    return (
        <section
            id="top-navbar"
            className="flex items-center justify-between w-full h-[var(--topnavbar-height)] ">
            <TopNavbarMenu />
            <TopNavbarProductSearch />
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
                        className="text-[10px] uppercase tracking-wider cursor-pointer">
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
                        className="text-[10px] cursor-pointer tracking-wider uppercase">
                        iniciar sesion
                    </Link>
                </NavbarItem>
                <TopNavbarShopCart />
            </NavbarContent>
        </section>
    )
}

export default TopNavBar