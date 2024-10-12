import { Navbar as NavbarUI } from "@nextui-org/react";
import NavBarNavigation from "./NavBarNavigation";




const SubNavBar = () => {

    return (
        <NavbarUI
            maxWidth="sm"
            style={{ boxShadow: "5px 5px 2px -2px rgba(0,0,0,0.10)" }}
            className="h-20 hidden sm:flex " >
            <NavBarNavigation />
        </NavbarUI>

    )
}
export default SubNavBar