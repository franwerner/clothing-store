import { HTMLProps, useEffect } from "react"
import ShopcartTotal from "./Total.shopcart"
import ShopcartProducts from "./Products.shopcart"
import useShopcartGetSession from "@/api/shopcart/useGetShopcartSession.api";

const Shopcart = (props: HTMLProps<HTMLDivElement>) => {
    const { isLoading, setRequest } = useShopcartGetSession()
    useEffect(() => {
        setRequest()
    }, [])
    return (
        <div  {...props}>
            <ShopcartProducts  isLoading = {isLoading} />
            <ShopcartTotal  />
        </div>
    )
}

export default Shopcart