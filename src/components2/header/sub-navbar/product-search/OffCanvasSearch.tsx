import useQueryMD from "@/hooks/useQueryMd.hook"
import { AnimatePresence } from "framer-motion"
import { Backdrop, MyComponent } from "my-components"
import { CSSProperties, FC } from "react"

interface OffCanvasSearchProps {
    onShow: () => void
    show: boolean
}

const offCanvasSearchStyle: CSSProperties = {
    zIndex: 30,
    position: "absolute",
    backgroundColor: "#fff",
    top: 0,
    right: 0,
    width: "100%",
    height: "50px",
    display: "flex",
    alignItems: "center",
    padding: "0 15px"
}

const inputSearchStyle: CSSProperties = {
    height: "100%",
    width: "100%",
    outline: "none",
    border: 0,
    textTransform: "uppercase",
    fontSize: "16px"
}

const OffCanvasSearch: FC<OffCanvasSearchProps> = ({ onShow, show }) => {

    const query = useQueryMD()

    const isShow = show && !query

    return (
        <>
            <Backdrop show={isShow} onClose={onShow} />
            <AnimatePresence>
                {
                    isShow && <MyComponent
                        id="OffCanvasSearch"
                        initial={{
                            y: -100
                        }}
                        animate={{
                            y: 0
                        }}
                        exit={{
                            y: -100,
                        }}
                        transition={{
                            stiffness: 30,
                        }}
                        style={offCanvasSearchStyle}
                    >
                        <span
                            onClick={onShow}
                            style={{
                                cursor: "pointer",
                                padding: 20,
                                color: "#4f4f4f"
                            }}
                            className="material-symbols-outlined">
                            arrow_back_ios
                        </span>
                        <input
                            style={inputSearchStyle}
                            placeholder="Buscar..."
                        />
                        <span
                            style={{
                                padding: "2px 10px",
                                color: "#4f4f4f",
                            }}
                            className="material-symbols-outlined">
                            search
                        </span>
                    </MyComponent>
                }
            </AnimatePresence>
        </>
    )
}

export default OffCanvasSearch