import { MyComponent } from "my-components"

const Account = () => (
    <MyComponent
        responsive={{
            md: {
                style: {
                    display: "flex"
                }
            }
        }}
        style={{
            display: "none",
            gap: 15,
            alignItems: "center"
        }}>
        <a style={{
            textWrap: "nowrap",
            fontSize: 13,
            cursor: "pointer"
        }}>Crear cuenta</a>
        <span style={{
            height: "20px",
            width: "1px",
            background: "#e7e7e7"
        }} />
        <a style={{
            textWrap: "nowrap",
            fontSize: 13,
            cursor: "pointer"
        }}>Iniciar session</a>
    </MyComponent>
)

export default Account