import navigationList from "@/pages/main/constant/navigationList.contant"
import { Link } from "@nextui-org/react"
import { Link as LinkDom } from "react-router"
import { useSelector } from "@/store"



const Contact = () => {

    const { contact_phone, location, contact_email } = useSelector(({ storeConfig }) => storeConfig.config) || {}

    const contactList = [
        {
            type: "direction",
            icon: "location_on",
            method: location
        },
        {
            type: "mail",
            icon: "mail",
            method: contact_email
        },
        {
            type: "phone",
            icon: "call",
            method: contact_phone
        },
    ]

    return (
        <div id="footer-contact" className="flex flex-col  items-center sm:items-start ">
            <h3 className="font-oswald text-default-700   sm:text-start text-xl font-bold uppercase">Contactanos</h3>
            {
                contactList.map(({ icon, method }) =>
                    <div
                        key={icon}
                        className="flex gap-x-2 p-[3px]">
                        <span className="material-symbols-outlined">
                            {icon}
                        </span>
                        <p className="font-light">{method}</p>
                    </div>
                )
            }
        </div>
    )
}

const Navegation = () => {
    return (
        <nav
            id="footer-navigation"
            className="flex flex-col  items-center sm:items-start">
            <h3 className="font-oswald text-default-700   text-xl font-bold uppercase">Navegación</h3>
            <ul >
                {
                    navigationList.map(({ name, url }, index) =>
                        <li
                            key={index}
                            className="p-[3px] cursor-pointer  flex flex-col ">
                            <Link
                                to={url}
                                as={LinkDom}
                                color="foreground"
                                className=" max-w-min capitalize font-light">
                                {name}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    )
}

const FooterMain = () => {
    return (
        <section
            id="footer-main"
            style={{
                boxShadow: "0px -1px 3px 0px rgba(0,0,0,0.25) "
            }}
            className=" p-2 sm:px-3 flex w-full justify-center ">
            <div className="max-w-[--page-width] flex-grow flex-col gap-y-8 flex sm:flex-row p-12  justify-around">
                <Navegation />
                <Contact />
            </div>
        </section>
    )
}

export default FooterMain