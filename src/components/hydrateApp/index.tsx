import LoadPage from "@/components/LoadPage"
import useGetUserSession from "@/api/hook/users/account/useGetUserSession.account"
import { memo, ReactNode, useLayoutEffect } from "react"
import useShopcartGetSession from "@/api/hook/users/shopcart/useGetSession.shopcart"

interface HydrateAppProps {
    children?: ReactNode
}

const HydrateApp = memo(({ children }: HydrateAppProps) => {

    const [{ isLoading: one }, user] = useGetUserSession()
    const [{ isLoading: two }, shopcart] = useShopcartGetSession()

    const loadings = [one, two].some(i => i === true)

    useLayoutEffect(() => {
        if (localStorage.getItem("userHasLoggedIn")) {
            user.setRequest()
        }
        shopcart.setRequest()

    }, []);

    return loadings ? <LoadPage screen="full" /> : children
})

export default HydrateApp
