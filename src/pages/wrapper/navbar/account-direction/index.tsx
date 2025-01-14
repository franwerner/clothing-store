import { useSelector } from "@/store"
import { memo, useState } from "react"
import AccountDirectionModal from "./Modal.account-direction"

const Icon = memo(({ onShow }: { onShow: () => void }) => {
    const postal_code = useSelector(({ userAddress }) => userAddress.address?.postal_code) ?? ""
    return (
        <div
            onClick={onShow}
            className=" flex flex-col relative items-center -mt-1 cursor-pointer pl-1">
            <span className="material-symbols-outlined text-[35px]">
                distance
            </span>
            <small className="font-medium leading-4 text-[16px]">{postal_code}</small>
        </div>
    )
})


const NavbarAccountDirection = memo(() => {

    const [show, setShow] = useState(false)

    const onShow = () => setShow(prev => !prev)

    const { email_confirmed } = useSelector(({ user }) => user.info) || {}

    return (
        <>
            {(email_confirmed || "") &&
                <Icon onShow={onShow} />}
            < AccountDirectionModal
                onShow={onShow}
                show={show && !!email_confirmed}
            />
        </>
    )
})

export default NavbarAccountDirection