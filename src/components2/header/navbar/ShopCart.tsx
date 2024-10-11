import { CSSProperties } from "react";

const shopCartStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
}

const itemsCounterStyle: CSSProperties = {
    position: "absolute",
    right: -8,
    top: -13,
    background: "#454545",
    borderRadius: "50%",
    color: "white",
    fontSize: "14px",
    width: "22px",
    height: "22px",
    lineHeight: "21px",
    textAlign: "center"
}

const moneyStyle: CSSProperties = {
    color: "#3c3c3c",
    fontWeight: "400",
    fontSize: "13px",
    minWidth: "auto",
    maxWidth: "90px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
}

const shopCartIconStyle: CSSProperties = {
    fontSize: "30px",
    lineHeight: "20px"
}

const ShopCart = () => {
    return (
        <div style={shopCartStyle}
            id="shop-cart">
            <div style={{ position: "relative" }}>
                <span style={itemsCounterStyle}>
                    0
                </span>
                <span
                    style={shopCartIconStyle}
                    className="material-symbols-outlined">
                    shopping_cart
                </span>
            </div>
            <span style={moneyStyle}>
                $145000,00
            </span>
        </div>
    );
};

export default ShopCart;