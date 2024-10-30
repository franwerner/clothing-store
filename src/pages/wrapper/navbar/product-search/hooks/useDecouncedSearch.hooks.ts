import { useEffect } from "react";
import router from "@/router";
import getUrlQueryParams from "@/helper/getUrlQueryParams.helper";

const useDebouncedSearch = (value: string, fn: () => void) => {
    useEffect(() => {
        if (value === getUrlQueryParams("q", "productos/busqueda")) return
        const timeout = setTimeout(() => {
            router.navigate(`/productos/busqueda?q=${value}`)
            fn()
        }, 500);
        return () => {
            timeout && clearTimeout(timeout)
        }
    }, [value])

}

export default useDebouncedSearch