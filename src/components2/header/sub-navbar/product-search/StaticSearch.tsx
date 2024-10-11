import { MyComponent } from "my-components"
import { CSSProperties, memo } from "react"

const staticSearchStyle: CSSProperties = {
    textIndent: "30px",
    border: "2px solid #454545",
    borderRadius: "30px",
    padding: 8,
    outline: "none",
    width: "300px",
    display: "none"
}

const StaticSearch = memo(() => (
    <MyComponent
        id="staticSearch"
        responsive={{
            md: {
                style: {
                    display: "block"
                }
            }
        }}
        whileFocus={{
            border: "2px solid #a27de8",
            boxShadow: "-2px -1px 26px -10px rgba(162,125,232,1)"
        }}
        whileHover={{
            border: "2px solid #a27de8",
            boxShadow: "-2px -1px 26px -10px rgba(162,125,232,1)"
        }}
        as="input"
        type="text"
        placeholder="Buscar..."
        style={staticSearchStyle} />
))

export default StaticSearch