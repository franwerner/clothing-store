
interface NavigationList {
    url: string,
    name: string,
    icon: string
}
const navigationList: Array<NavigationList> = [
    {
        name: "inicio",
        url: "/",
        icon: "home"
    },
    {
        name: "productos",
        url: "/productos",
        icon: "shopping_bag"
    },
    // {
    //     name: "Ofertas",
    //     url: "/ofertas",
    //     icon: "sell"
    // },
    {
        name: "contacto",
        url: "/contacto",
        icon: "contact_support"
    },
    {
        name: "envios",
        url: "/envios",
        icon: "local_shipping"
    },

]

export type {NavigationList}
export default navigationList