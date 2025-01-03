import { NavbarBrand, NavbarContent, Navbar as NavbarUI } from "@nextui-org/react"
import { memo, useEffect, useRef, useState } from "react"
import NavbarMenu from "./menu"
import NavbarNavigation from "./navigation"
import NavbarProductSearch from "./product-search"
import NavbarAccount from "./account"
import NavbarShopCart from "./shopcart"
import imgBrand from "@assets/Olga hats.jpg"
import NavbarClientDirection from "./client-direction"

const NavBar = memo(() => {
    const ref = useRef<HTMLDivElement>(null)
    const [isHidden, setIsHidden] = useState(false)

    useEffect(() => {
        const fn = () => {
            if (!ref.current) return
            const { y } = ref.current.getBoundingClientRect()
            const is = Math.abs(y) >= 100
            isHidden !== is && setIsHidden(is)

        }
        window.addEventListener("scroll", fn)
        return () => {
            window.removeEventListener("scroll", fn)
        }
    }, [isHidden])

    return (
        <>
            <div
                ref={ref}
                id="navbar-referencia-height"
                className="w-full h-[100px]  absolute">
            </div>
            <NavbarUI
                isBlurred={false}
                data-hidde={isHidden}
                maxWidth="2xl"
                style={{
                    //@ts-ignore
                    "--navbar-height": isHidden ? "60px" : "100px",
                    boxShadow: "0px 1px 10px 0px rgba(0,0,0,0.25)",
                }}
                classNames={{
                    wrapper: `flex-wrap gap-1 flex flex-nowrap items-center justify-between w-full  `,
                }}>
                <NavbarMenu />
                <NavbarNavigation />
                <NavbarBrand className={`justify-center `}>
                    <img
                        data-hidde={isHidden}
                        className={`w-[100px] select-none ${isHidden ? "scale-0" : "scale-1"}`}
                        loading="lazy"
                        alt="logo-olga-hats"
                        src={imgBrand}
                    />

                </NavbarBrand>
                <NavbarContent
                    as="div"
                    className="data-[justify=start]:justify-end  max-lg:max-w-min ">
                    <NavbarProductSearch />
                    <NavbarAccount />
                    <NavbarShopCart />
                    <NavbarClientDirection/>
                </NavbarContent>
            </NavbarUI>
        </>
    )
})

export default NavBar