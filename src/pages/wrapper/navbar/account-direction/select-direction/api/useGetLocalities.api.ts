import { useDelay, useFetch } from "my-hooks"
import { useEffect, useState } from "react"

type GeorefValues = Array<
{
    id: string,
    nombre: string,
    departamento_nombre : string
}
>

interface Localities {
    cantidad: number,
    inicio: number,
    localidades: GeorefValues
}

interface UseGetLocalitiesProps {
    locality: string,
    province: string
}

const useGetLocalities = ({ locality, province }: UseGetLocalitiesProps) => {

    const [localities, setLocalities] = useState<GeorefValues>([])

    const { createDelay, cleanDelay } = useDelay()

    const [hasMoreData, setHasMoreData] = useState(true)

    const { isLoading, setRequest, clearSideEffects} = useFetch<Localities>({
        target: "https://apis.datos.gob.ar/georef/api/localidades",
        onSuccess(response) {
            const localidades = response.result.localidades
            if (localidades.length === 0) {
                setHasMoreData(false)
            } else {
                setLocalities((prev) => ([...prev, ...localidades]))
            }
        },
    })

    const loadMoreData = (offset: number = localities.length) => {
        if (!province) return
        setRequest({
            query: {
                provincia: province,
                nombre: locality || undefined,
                inicio: offset,
                max: 10,
                campos : "departamento",
                aplanar : true
            },
        })
    }

    useEffect(() => {
        createDelay(() => {
            loadMoreData(0)
            setHasMoreData(true)
            localities.length > 0 && setLocalities([])
        }, 0.4)

        return () => {
            clearSideEffects()
            cleanDelay()
        }
    }, [province, locality])

    return {
        isLoading,
        localities: localities,
        hasMoreData: localities.length % 10 == 0 && hasMoreData,
        loadMoreData
    }
}

export default useGetLocalities