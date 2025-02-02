import { useSelector } from "@/store"
import { Spinner } from "@nextui-org/react"
import { lazy, memo, Suspense, useState } from "react"

const LazyAccountDirectionModal = lazy(() => import("./Modal.account-direction"))

const Icon = memo(({ onShow }: { onShow: () => void }) => {
    const postal_code = useSelector(({ userAddress }) => userAddress.postal_code)
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

    const verification = email_confirmed || ""

    return (
        <>
            {verification && <Icon onShow={onShow} />}
            <Suspense fallback={<Spinner color="secondary" size="sm" />}>
                {
                    verification && < LazyAccountDirectionModal
                        onShow={onShow}
                        show={show}
                    />
                }
            </Suspense>
        </>
    )
})

export default NavbarAccountDirection