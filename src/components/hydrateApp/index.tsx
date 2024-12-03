import LoadPage from "@/components/LoadPage"
import useGetUserSession from "@/hooks/api/useGetUserSession.api"
import { memo, ReactNode, useEffect } from "react"

interface HydrateAppProps {
    children?: ReactNode
}

const HydrateApp = memo(({ children }: HydrateAppProps) => {

    const [{isLoading}, user] = useGetUserSession()

    const loadings = [isLoading].some(i => i === true)

    useEffect(() => {
        user.setRequest()
    }, [])


    return loadings ? <LoadPage screen="full" /> : children
})

export default HydrateApp
