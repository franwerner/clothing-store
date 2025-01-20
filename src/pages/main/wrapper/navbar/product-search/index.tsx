import { Button } from "@nextui-org/react";
import { memo, useCallback, useState } from "react";
import ProductSearchModal from "./Modal.product-search";

const Icon = memo(({ onShow }: { onShow: () => void }) => (
    <Button
        onPress={onShow}
        aria-label="magnify"
        isIconOnly
        size="lg"
        color="default"
        className="material-symbols-outlined bg-white text-black    text-[28px]  ">
        search
    </Button>
))

const NavbarProductSearch = memo(() => {
    const [show, setShow] = useState(false)
    const onShow = useCallback(() => {
        setShow(prev => !prev)
    }, [])

    return (
        <>
            <Icon onShow={onShow} />
            <ProductSearchModal
                onShow={onShow}
                show={show} />
        </>
    );
});

export default NavbarProductSearch;