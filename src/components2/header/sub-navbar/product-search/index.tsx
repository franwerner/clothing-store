import { CSSProperties, useCallback, useState } from "react";
import OffCanvasSearch from "./OffCanvasSearch";
import SearchIcon from "./SearchIcon";
import StaticSearch from "./StaticSearch";

const productSearchStyle: CSSProperties = {
    display: "flex",
    width: "auto",
    alignItems: "center",
    height: "min-conent",
}

const ProductSearch = () => {

    const [show, setShow] = useState(false)

    const onShow = useCallback(() => {
        setShow(prev => !prev)
    }, [])

    return (
        <div
            id="ProductSearch"
            style={productSearchStyle}>
            <SearchIcon onShow={onShow} />
            <StaticSearch />
            <OffCanvasSearch show={show} onShow={onShow} />
        </div>
    )
};

export default ProductSearch