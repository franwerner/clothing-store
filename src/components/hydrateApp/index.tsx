import LoadPage from "@/components/LoadPage"
import useGetUserSession from "@/api/hook/users/account/useGetUserSession.account"
import { memo, ReactNode, useLayoutEffect } from "react"

interface HydrateAppProps {
    children?: ReactNode
}

const HydrateApp = memo(({ children }: HydrateAppProps) => {

    const [{ isLoading }, user] = useGetUserSession()

    const loadings = [isLoading].some(i => i === true)

    useLayoutEffect(() => {
        if (!localStorage.getItem("userHasLoggedIn")) return
        user.setRequest()
    }, []);

    return loadings ? <LoadPage screen="full" /> : children
})

export default HydrateApp
