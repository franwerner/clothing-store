import { useFetch } from "my-hooks"
import { useEffect } from "react"

interface Provinces {
    cantidad: number,
    inicio: number,
    provincias: {
        id: string,
        nombre: string
    }[]
}

const useGetProvinces = (province_name: string) => {

    const { isLoading, response, setRequest, clearSideEffects } = useFetch<Provinces, { f: string }>({
        target: "https://apis.datos.gob.ar/georef/api/provincias",
    })

    useEffect(() => {
        setRequest({
            query: {
                nombre: province_name || undefined,
                campos: "nombre"
            },
            delay: 0.4
        })
        return clearSideEffects
    }, [province_name])

    const is = response.result?.provincias ?? []

    return {
        isLoading,
        provinces: is
    }

}

export default useGetProvinces