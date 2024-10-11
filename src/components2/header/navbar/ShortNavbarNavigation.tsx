import { MyComponent } from "my-components"
import { CSSProperties } from "react"

interface ShortItem {
    icon: string,
    url: string,
    name: string
}

const shortNavigationList: Array<ShortItem> = [
    {
        icon: "home",
        url: "/",
        name: "Inicio"
    },
    {
        icon: "shopping_bag",
        url: "/",
        name: "Productos"
    },
    {
        icon: "sell",
        url: "/",
        name: "Ofertas"
    },
]

const itemsStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textDecoration: "none",
}

const Items = ({ name, url, icon }: ShortItem) => {

    const current = "Inicio"

    return (
        <li
            style={{ borderBottom: current == name ? "1px solid #010101" : "0px" }}>
            <a
                style={{
                    ...itemsStyle,
                    color: current == name ? "#010101" : "#4f4f4f"
                }}
                href={url}>
                <span
                    style={{ fontSize: "30px" }}
                    className="material-symbols-outlined"
                >
                    {icon}
                </span>
                <span
                    style={{
                        fontWeight: "600",
                        fontSize: "14px"
                    }}>
                    {name}
                </span>
            </a>
        </li>
    )
}

const ShortNavbarNavigation = () => {

    return (
        <MyComponent
            as="ul"
            responsive={{
                md: {
                    style: {
                        display: "none"
                    }
                },
            }}
            style={{
                display: "flex",
                justifyContent: "space-evenly",
                listStyle: "none",
                flex: 0.8
            }}>
            {
                shortNavigationList.map((props) => <Items key={props.name} {...props} />)
            }

        </MyComponent>
    )
}

export default ShortNavbarNavigation