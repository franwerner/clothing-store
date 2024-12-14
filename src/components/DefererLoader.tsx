import { ReactNode } from "react"
import { useNavigation } from "react-router"
import LoadPage from "./LoadPage"

interface DefererLoaderProps {
    children: ReactNode,
    fallback?: ReactNode
}

const DeferLoader = ({ children, fallback = <LoadPage />, }: DefererLoaderProps) => {

    const { state } = useNavigation()

    return state === "loading" ? fallback : children

}

export default DeferLoader