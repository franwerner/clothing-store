import useGetUserSession from "@/api/useGetUserSession.api"
import LoadPage from "./LoadPage"
import useShopcartGetSession from "@/api/shopcart/useGetSession.api"
import { memo, ReactNode, useEffect } from "react"

interface HydrateAppProps {
    children?: ReactNode
}

const HydrateApp = memo(({ children }: HydrateAppProps) => {

    const userSession = useGetUserSession()
    const shopcartSession = useShopcartGetSession()

    const loadings = [userSession.isLoading, shopcartSession.isLoading].some(i => i === true)

    useEffect(() => {
        if (localStorage.getItem("userHasLoggedIn")) {
            userSession.setRequest()
        }
        shopcartSession.setRequest()

    }, []);

    return loadings ? <LoadPage screen="full" /> : children
})

export default HydrateApp
