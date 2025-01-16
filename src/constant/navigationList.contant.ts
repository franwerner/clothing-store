
interface NavigationList {
    url: string,
    name: string,
}
const navigationList: Array<NavigationList> = [
    {
        name: "inicio",
        url: "/",
    },
    {
        name: "productos",
        url: "/productos",
    },
    {
        name: "contacto",
        url: "/contacto",
    },
    {
        name: "envios",
        url: "/envios",
    },

]

export type {NavigationList}
export default navigationList