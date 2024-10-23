
interface Contact {
    icon: string,
    method: string,
    type: string
}

const contactList: Array<Contact> = [
    {
        type: "direction",
        icon: "location_on",
        method: "Buenos Aires, Ramos Mejía"
    },
    {
        type: "mail",
        icon: "mail",
        method: "olgahats@gmail.com"
    },
    {
        type: "phone",
        icon: "call",
        method: "1195012332"
    },
]

export default contactList
