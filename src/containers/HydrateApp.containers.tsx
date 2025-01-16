import useShopcartGetSession from "@/api/shopcart/useGetSession.api"
import useGetUserSession from "@/api/useGetUserSession.api"
import useGetUserAddress from "@/api/user-address/useGetUserAddress.api"
import LoadPage from "@/components/LoadPage"
import { useSelector } from "@/store"
import { ReactNode, useEffect } from "react"

interface HydrateAppProps {
    children?: ReactNode
}

const HydrateApp = ({ children }: HydrateAppProps) => {

    const userSession = useGetUserSession()
    const shopcartSession = useShopcartGetSession()
    const userAddress = useGetUserAddress()

    const user_id = useSelector(({ user }) => user.info?.user_id)
    const email_confirmed = useSelector(({ user }) => user.info?.email_confirmed)

    const loadings = [userSession.isLoading, shopcartSession.isLoading, userAddress.isLoading].some(i => i === true)

    useEffect(() => {
        if (!user_id || !email_confirmed) return
        userAddress.setRequest()
    }, [user_id])

    useEffect(() => {
        if (localStorage.getItem("userHasLoggedIn")) {
            userSession.setRequest()
        }
        shopcartSession.setRequest()
    }, [])

    return loadings ? <LoadPage screen="full" /> : children
}

export default HydrateApp
