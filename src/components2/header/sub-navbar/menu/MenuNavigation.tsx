import navigationList from "@/constant/navigationList.contant"
import { MyComponent } from "my-components"
import { CSSProperties, memo } from "react"

interface MenuNavigationItemProps {
    index: number,
    name: string
    url: string
}

const linkStyle: CSSProperties = {
    textDecoration: "none",
    color: "#010101",
    display: "flex",
    justifyContent: "space-between"
}

const itemStyle: CSSProperties = {
    padding: "10px",
    paddingTop: "20px",
    width: "100%",
}

const menuNavigationListStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "start",
    width: "100%",
    listStyle: "none"
}


const Items = memo(({
    index,
    name,
    url
}: MenuNavigationItemProps) => {
    return (
        <MyComponent
            as="li"
            initial={{
                y: -(index * 100)
            }}
            animate={{
                y: 0,
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 40,
                    delay: 0.2 * index
                }
            }}
            style={{
                ...itemStyle,
                borderBottom: index >= navigationList.length ? "0px" : "1px solid #E7E7E7",

            }}>
            <a
                style={{
                    ...linkStyle,
                    fontWeight: name == "Inicio" ? "600" : "300",
                }}
                href={url}>
                {name}
            </a>

        </MyComponent>
    )
})

const MenuNavigation = () => {
    return (
        <MyComponent
            as="ul"
            style={menuNavigationListStyle}>
            {
                navigationList.map(({ name, url }, index) => {
                    return <Items
                        key={name}
                        index={index + 1}
                        name={name}
                        url={url} />
                })
            }
        </MyComponent>
    )
}

export default MenuNavigation