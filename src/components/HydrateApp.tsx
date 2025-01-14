import useShopcartGetSession from "@/api/shopcart/useGetSession.api"
import useGetUserSession from "@/api/useGetUserSession.api"
import useGetUserAddress from "@/api/user-address/useGetUserAddress.api"
import { useDispatch, useSelector } from "@/store"
import { memo, ReactNode, useEffect } from "react"
import LoadPage from "./LoadPage"

interface HydrateAppProps {
    children?: ReactNode
}

const HydrateApp = memo(({ children }: HydrateAppProps) => {

    const userSession = useGetUserSession()
    const shopcartSession = useShopcartGetSession()
    const userAddress = useGetUserAddress()

    const user_id = useSelector(({ user }) => user.info?.user_id)

    const loadings = [userSession.isLoading, shopcartSession.isLoading, userAddress.isLoading].some(i => i === true)

    useEffect(() => {
        if (!user_id) return
        userAddress.setRequest()
    }, [user_id])

    useEffect(() => {
        if (localStorage.getItem("userHasLoggedIn")) {
            userSession.setRequest()
        }
        shopcartSession.setRequest()
    }, [])

    return loadings ? <LoadPage screen="full" /> : children
})

export default HydrateApp
