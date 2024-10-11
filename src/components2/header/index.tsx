import { CSSProperties } from "react";
import Navbar from "./navbar";
import SubNavbar from "./sub-navbar";

const headerStyle:CSSProperties = {
    boxShadow: "0px 1px 10px -3px rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    overflow: "hidden"
}

const Header = () => {
    return (
        <header
            style={headerStyle} >
            <SubNavbar />
            <Navbar />
        </header>
    );
};

export default Header;
