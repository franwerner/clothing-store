import useFetch from "@/hooks/useFetch"
import { useEffect } from "react"

interface Provinces {
    cantidad: number,
    inicio: number,
    parametros: {},
    provincias: {
        id: string,
        nombre: string
    }
}

const useGetProvinces = () => {

    const {isLoading,response,setRequest} = useFetch<Provinces, { f: string }>({
        target: "https://apis.datos.gob.ar/georef/api/provincias",
    })

    useEffect(() => {
        setRequest()
    }, [])


    const is = response.result?.provincias ?? []

    return {
        isLoading,
        provinces: is
    }

}

export default useGetProvinces