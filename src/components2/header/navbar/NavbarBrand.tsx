import { MyComponent } from "my-components"
import { CSSProperties } from "react"

const brandStyle: CSSProperties = {
    display: "flex",
    order: 3,
    width: "100%",
    marginTop: "4px"
}

const imageStyle: CSSProperties = {
    width: "100px",
    userSelect: "none",
    margin: "auto"
}

const NavbarBrand = () => {
    return <MyComponent
        as="a"
        id="brand"
        href="/"
        responsive={{
            xs: {
                style: {
                    order: 0,
                    width: "auto",
                    marginTop: 0
                },
            }
        }}
        style={brandStyle}
    >
        <img
            loading="lazy"
            alt="logo-olga-hats"
            src="../../assets/olga hats.jpg"
            style={imageStyle}
        />
    </MyComponent>
}


export default NavbarBrand