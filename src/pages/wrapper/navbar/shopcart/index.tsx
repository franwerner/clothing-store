import useOptimizationModal from "@/hooks/useOptimizationModal";
import { Badge } from "@nextui-org/react";
import { memo, useCallback, useState } from "react";
import ShopcartModal from "./Modal.shopcart";

const Icon = memo(({ onShow }: { onShow: () => void }) => (
    <div onClick={onShow} className="relative text- flex justify-center items-center cursor-pointer flex-col" >
        <Badge
            content="(5)"
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
))

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