import { MyComponent } from "my-components"
import { memo } from "react"

const SearchIcon = memo(({ onShow }: { onShow: () => void }) => {

    return (
        <MyComponent
            as="span"
            onClick={onShow}
            responsive={{
                md: {
                    style: {
                        position: "absolute",
                        cursor: "auto"
                    }
                }
            }}
            style={{
                cursor: "pointer",
                padding: "2px 10px",
                color: "#4f4f4f",
                textAlign: "end",
            }} className="material-symbols-outlined">
            search
        </MyComponent>
    )
})

export default SearchIcon