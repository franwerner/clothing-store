import navigationList from "@/constant/navigationList.contant"
import { useLocation } from "react-router"

const useGetMainPaths = () => {
    const { pathname } = useLocation()

    const split = pathname.split("/").filter(Boolean)[0]

    const key = navigationList.find((i) => i.url == `/${split}`)?.url || "/"
    return key
}

export default useGetMainPaths