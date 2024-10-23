import contactList from "@/constant/contactList.contant"
import navigationList from "@/constant/navigationList.contant"
import router from "@/router"
import { Link } from "@nextui-org/react"


const Contact = () => {
    return (
        <div id="footer-contact" className="flex flex-col  items-center sm:items-start ">
            <h3 className="font-oswald text-default-600   sm:text-start text-xl font-bold uppercase">Contactanos</h3>
            {
                contactList.map(({ icon, method }, index) =>
                    <div
                        key={index}
                        className="flex gap-x-2 p-[3px]">
                        <span className="material-symbols-outlined text-default-600">
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
            <h3 className="font-oswald text-default-600  text-xl font-bold uppercase">Navegación</h3>
            <ul >
                {
                    navigationList.map(({ name, url }, index) =>
                        <li
                            key={index}
                            className="p-[3px] cursor-pointer ">
                            <Link
                                color="foreground"
                                className="hover:border-default-400 border-transparent border-b-1  font-light"
                                onClick={() => router.navigate(url)}>
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
            className="flex-grow p-2 sm:px-3 flex w-full justify-center ">
            <div className="max-w-[--page-width] flex-grow flex-col gap-y-8 flex sm:flex-row p-12  justify-around">
                <Navegation />
                <Contact />
            </div>
        </section>
    )
}

export default FooterMain