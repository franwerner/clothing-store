import { useEffect } from "react";
import router from "@/router";
import getUrlQueryParams from "@/helper/getUrlQueryParams.helper";

const useDebouncedSearch = (value: string, fn: () => void) => {
    useEffect(() => {
        if (value === getUrlQueryParams("search", "productos/busqueda")) return
        const timeout = setTimeout(() => {
            router.navigate(`/productos/busqueda?search=${value}`)
            fn()
        }, 500);
        return () => {
            timeout && clearTimeout(timeout)
        }
    }, [value])

}

export default useDebouncedSearch