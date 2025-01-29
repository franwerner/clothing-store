import useShopcartGetSession from "@/api/shopcart/useGetShopcartSession.api"
import useGetStoreConfig from "@/api/store-config/useGetStoreConfig.api"
import useGetUserAddress from "@/api/user-address/useGetUserAddress.api"
import useGetUserSession from "@/api/user-session/useGetUserSession.api"
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
    const storeConfig = useGetStoreConfig()

    const user_id = useSelector(({ user }) => user.info?.user_id)
    const email_confirmed = useSelector(({ user }) => user.info?.email_confirmed)

    const loadings = [userSession.isLoading, shopcartSession.isLoading, userAddress.isLoading].some(i => i === true)

    useEffect(() => {
        if (!user_id || !email_confirmed) return
        userAddress.setRequest()
        return userAddress.clearSideEffects
    }, [user_id])

    useEffect(() => {
        if (localStorage.getItem("userHasLoggedIn")) {
            userSession.setRequest()
        }
        shopcartSession.setRequest()
        storeConfig.setRequest()
    }, [])

    return loadings ? <LoadPage screen="full" /> : 
     storeConfig.response.result_error?.code === "app_maintenance" ? "fff" : children
}

export default HydrateApp
