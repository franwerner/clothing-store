import navigationList from "@/constant/navigationList.contant";
import { MyComponent } from "my-components"
import { CSSProperties, memo } from "react";


const navigationStyleMD: CSSProperties = {
    gap: 20,
    flexDirection: "row",
    display: "flex",
    listStyle: "none",
    justifyContent: "center",
}

const Items = memo(({ name, url }: { name: string, url: string }) => {
    const currentNavigation = "Inicio"
    return (
        <li
            style={{ margin: "5px 0" }}>
            <a
                href={url}
                style={{
                    textDecoration: "none",
                    color: "#010101",
                    fontWeight: name === currentNavigation ? "600" : "300"
                }}>
                {name}
            </a>
        </li>
    )
})

const NavbarNavigation = () => {

    return (
        <MyComponent
            as="ul"
            id="navigation"
            responsive={{
                md: {
                    style: navigationStyleMD
                },
            }}
            style={{
                display: "none"
            }}>
            {
                navigationList.map(({ name, url }) => {
                    return <Items key = {name} name={name} url={url} />
                })
            }
        </MyComponent>
    );
};

export default NavbarNavigation