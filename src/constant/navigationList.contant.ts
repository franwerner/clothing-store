
interface NavigationList {
    url: string,
    name: string,
    icon: string
}
const navigationList: Array<NavigationList> = [
    {
        name: "Inicio",
        url: "/",
        icon: "home"
    },
    {
        name: "Productos",
        url: "/productos",
        icon: "shopping_bag"
    },
    {
        name: "Ofertas",
        url: "/ofertas",
        icon: "sell"
    },
    {
        name: "Contacto",
        url: "/contacto",
        icon: "contact_support"
    },
    {
        name: "Envios",
        url: "/envios",
        icon: "local_shipping"
    },

]

export type {NavigationList}
export default navigationList