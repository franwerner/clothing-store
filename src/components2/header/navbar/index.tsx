import { CSSProperties } from "react";
import NavbarBrand from "./NavbarBrand";
import NavbarNavigation from "./NavbarNavigation";
import ShopCart from "./ShopCart";
import ShortNavbarNavigation from "./ShortNavbarNavigation";

const navbarStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    padding: "15px 5px",
    maxWidth: "1000px",
    flexWrap: "wrap"
}

const Navbar = () => {
    return (
        <nav
            style={navbarStyle}
            id="navbar">
            <NavbarBrand />
            <NavbarNavigation />
            <ShortNavbarNavigation />
            <ShopCart />
        </nav>
    )
}

export default Navbar