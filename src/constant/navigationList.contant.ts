
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
        url: "/",
        icon: "shopping_bag"
    },
    {
        name: "Ofertas",
        url: "/",
        icon: "sell"
    },
    {
        name: "Contacto",
        url: "/",
        icon: "contact_support"
    },
    {
        name: "Envios",
        url: "/",
        icon: "local_shipping"
    },

]

export type {NavigationList}
export default navigationList