import { memo, useCallback, useState } from "react"
import ClientDirectionModal from "./Modal.client-direction"

const Icon = memo(({ onShow }: { onShow: () => void }) => (
    <div
        onClick={onShow}
        className=" flex flex-col cursor-pointer pl-1">
        <span className="material-symbols-outlined text-red-500 text-[28px]">
            location_on
        </span>
        <small className="font-medium text-[15px]">3100</small>
    </div>
))

const NavbarClientDirection = memo(() => {

    const [show, setShow] = useState(false)

    const onShow = useCallback(() => setShow(prev => !prev), [])

    console.log(show)
    return (
        <>
            <Icon onShow={onShow} />
            <ClientDirectionModal onShow={onShow} show={show} />
        </>
    )
})

export default NavbarClientDirection