import useFetchCustom from "@/hooks/useFetchCustom.hooks"

const useGetBranchesCorreoArgentino = () => {

    useFetchCustom({
        target: "https://correo-argentino1.p.rapidapi.com/obtenerSucursales",
        method: 'GET',
        headers: {
            'x-rapidapi-key': '4bfd52a6fcmsh49bc16c0c760b39p1c6b29jsn473b15b1d672',
            'x-rapidapi-host': 'correo-argentino1.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        params: {

        }
    })
}

export default useGetBranchesCorreoArgentino