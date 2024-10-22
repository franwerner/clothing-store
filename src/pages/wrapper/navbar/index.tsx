import { Navbar as NavbarUI } from "@nextui-org/react"
import SubNavbar from "./sub-navbar"
import TopNavBar from "./top-navbar"

const calcHideOnScroll = "calc(-1 * (var(--navbar-height) - (var(--subnavbar-height) + var(--topnavbar-height)) + var(--topnavbar-height) - 7px ) "

const NavBar = () => {

    return (
        <NavbarUI
            shouldHideOnScroll
            maxWidth="lg"
            style={{
                //@ts-ignore
                "--navbar-height": "180px",
                //@ts-ignore
                "--subnavbar-height": "68px",
                //@ts-ignore
                "--topnavbar-height": "96px",
                boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.25) "
            }}
            classNames={{
                wrapper: " flex-wrap  gap-1"
            }}
            motionProps={{
                variants: {
                    hidden: {
                        y: calcHideOnScroll,
                        transition: {
                            type: "spring",
                            damping: 20
                        }
                    },
                    visible: {
                        y: 0,
                        transition: {
                            type: "spring",
                            damping: 20
                        }
                    }
                }
            }}
            className=" bg-white">
            <TopNavBar />
            <SubNavbar />
        </NavbarUI>
    )
}

export default NavBar