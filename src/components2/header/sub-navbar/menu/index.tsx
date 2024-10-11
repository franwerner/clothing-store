import UseQueryMD from "@/hooks/useQueryMd.hook";
import { OffCanvas } from "my-components";
import { CSSProperties, useCallback, useState } from "react";
import IconMenu from "./IconMenu";
import MenuNavigation from "./MenuNavigation";



const offCanvasTitleStyle: CSSProperties = {
    color: "#3d3d3d",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "3px"
}

const Menu = () => {

    const query = UseQueryMD()

    const [show, setShow] = useState(false)

    const isShow = show && !query

    const onShow = useCallback(() => {
        setShow(prev => !prev)
    }, [])

    return (
        <>
            <OffCanvas
                onClose={onShow}
                show={isShow} >
                <OffCanvas.Header>
                    <OffCanvas.Title
                        style={offCanvasTitleStyle}>
                        Olga Hat's
                    </OffCanvas.Title>
                </OffCanvas.Header>
                <OffCanvas.Body>
                    <MenuNavigation />
                </OffCanvas.Body>
            </OffCanvas>
            <IconMenu onShow={onShow} />
        </>
    );
};

export default Menu