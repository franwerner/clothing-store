import { Navbar as NavbarUI } from "@nextui-org/react"
import SubNavbar from "./sub-navbar"
import TopNavBar from "./top-navbar"

const calcHideOnScroll = `
    calc(-1 * (var(--navbar-height) - 
    (var(--subnavbar-height) + var(--topnavbar-height)) + 
    var(--topnavbar-height) - 7px ) 
    `

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
                "--topnavbar-height": "96px"
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
                        }
                    },
                    visible: {
                        y: 0,
                        transition: {
                            type: "spring",
                        }
                    }
                }
            }}
            className=" bg-white shadow sm">
            <TopNavBar />
            <SubNavbar />
        </NavbarUI>
    )
}

export default NavBar