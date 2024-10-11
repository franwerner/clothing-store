import { MyComponent } from "my-components"
import { CSSProperties, memo } from "react"

const iconMenuStlye:CSSProperties = {
    fontSize: "30px",
    cursor: "pointer",
    userSelect: "none",
    color: "#4f4f4f"
}

const IconMenu = memo(({ onShow }: { onShow: () => void }) => (
    <MyComponent
    id = "icon-menu"
        as="span"
        onClick={onShow}
        responsive={{
            md: {
                style: {
                    display: "none"
                }
            }
        }}
        whileTap={{ scaleY: 1.2 }}
        style={iconMenuStlye}
        className="material-symbols-outlined">
        menu
    </MyComponent>
))

export default IconMenu