import { Navbar } from "@nextui-org/react";
import NavigationItems from "./NavigationItems.sub-navbar";




const SubNavBar = () => {

    return (
        <Navbar
        id = "sub-navbar"
            maxWidth="sm"
            style={{ boxShadow: "5px 5px 2px -2px rgba(0,0,0,0.10)" }}
            className="h-20 hidden sm:flex " >
            <NavigationItems />
        </Navbar>

    )
}
export default SubNavBar