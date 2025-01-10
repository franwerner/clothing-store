import useFetchCustom from "@/hooks/useFetchCustom.hooks"

interface Cost {
    cpOrigen: string
    cpDestino: string
    provinciaOrigen: string
    provinciaDestino: string
    peso: string
}

const useCalculateCostCorreoArgentino = (cost: Pick<Cost, "cpDestino" | "provinciaDestino">) => {

    useFetchCustom({
        target: "https://correo-argentino1.p.rapidapi.com/calcularPrecio",
        method: 'POST',
        headers: {
            'x-rapidapi-key': '4bfd52a6fcmsh49bc16c0c760b39p1c6b29jsn473b15b1d672', //Colocar en un ENV
            'x-rapidapi-host': 'correo-argentino1.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: {
            ...cost,
            peso: 1,
            cpOrigen: "B1001",
            provinciaDestino: "AR-B"
        }
    })
}

export default useCalculateCostCorreoArgentino