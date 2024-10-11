import ProductSearch from "./product-search";
import Menu from "./menu";
import Account from "./Account";
import { CSSProperties } from "react";


const subNavbarStyle: CSSProperties = {
    borderBottom: "1px solid #e7e7e7",
    width: "100%",
    display: "flex",
    height: "50px",
    justifyContent: "center"
}

const wrapperStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "900px",
    padding: "0px 15px",
}


const SubNavbar = () => {
    return (
        <div
            id="sub-navbar"
            style={subNavbarStyle}>
            <div
                id="sub-navbar-wrapper"
                style={wrapperStyle}
            >
                <Menu />
                <ProductSearch />
                <Account />
            </div>
        </div >
    );
};

export default SubNavbar;