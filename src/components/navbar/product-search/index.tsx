import { Button, NavbarContent, NavbarItem } from "@nextui-org/react";
import { useState } from "react";
import { useMediaQuery } from "responsive-component";
import StaticProductSearch from "./Static.product-search";
import ModalProductSearch from "./Modal.product-search";


const ProductSearchNavBar = () => {

    const { search } = useMediaQuery({ search: { maxWidth: 767.97 } })
    const [show, setShow] = useState(false)

    const onShow = () => {
        setShow(prev => !prev)
    }

    return (
        <NavbarContent className="data-[justify=start]:justify-center"   >
            <NavbarItem className="md:hidden">
                <Button
                    onClick={onShow}
                    aria-label="magnify"
                    isIconOnly
                    variant="flat"
                    color="secondary"
                    className="material-symbols-outlined text-secondary-400 text-3xl shadow ">
                    search
                </Button>
            </NavbarItem>
            <StaticProductSearch />
            <ModalProductSearch onShow={onShow} show={show && search.matches} />
        </NavbarContent >
    );
};

export default ProductSearchNavBar;