import { memo, useCallback, useState } from "react"
import ClientDirectionModal from "./Modal.client-direction"

const Icon = memo(({ onShow }: { onShow: () => void }) => (
    <div
        onClick={onShow}
        className=" flex flex-col items-center -mt-1 cursor-pointer pl-1">
        <span className="material-symbols-outlined   text-[35px]">
        distance
        </span>
        <small className="font-medium -mt-1 text-[16px]">E3100</small>
    </div>
))

const NavbarClientDirection = memo(() => {

    const [show, setShow] = useState(false)

    const onShow = useCallback(() => setShow(prev => !prev), [])

    return (
        <>
            <Icon onShow={onShow} />
            <ClientDirectionModal onShow={onShow} show={show} />
        </>
    )
})

export default NavbarClientDirection