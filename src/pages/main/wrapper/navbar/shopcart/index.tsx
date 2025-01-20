import useOptimizationModal from "@/hooks/useOptimizationModal.hook";
import { useSelector } from "@/store";
import { Badge } from "@nextui-org/react";
import { memo, useCallback, useState } from "react";
import ShopcartModal from "./Modal.shopcart";

const Icon = memo(({ onShow }: { onShow: () => void }) => {

    const products = useSelector(({ shopcart }) => shopcart.products) || []

    const count = products.reduce((acc, current) => acc + current.quantity, 0)
    return (
        <div
            id="shopcart-bag"
            onClick={onShow}
            className="relative text- flex justify-center items-center cursor-pointer flex-col" >
            <Badge
                content={`(${count})`}
                classNames={{
                    badge: "text-[15px] "
                }}
                className="font-bold  bg-white"
                variant="solid"
            >
                <span
                    className="material-symbols-outlined   text-[28px]">
                    local_mall
                </span>
            </Badge>
        </div>
    )
})
const NavbarShopCart = memo(() => {

    const [show, setShow] = useState(false)

    const onShow = useCallback(() => {
        setShow(prev => !prev)
    }, [])

    useOptimizationModal(show)

    return (
        <>
            <Icon onShow={onShow} />
            <ShopcartModal onShow={onShow} show={show} />
        </>
    );
})
export default NavbarShopCart;