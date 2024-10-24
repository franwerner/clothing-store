import { memo } from "react"
import FooterMain from "./Main.footer"
import FooterTop from "./Top.footer"


const Footer = memo(() => {
    return (
        <footer
        className="flex justify-center items-center flex-col min-h-[50dvh] mt-10 w-full  ">
                <FooterTop />
                <FooterMain/>
        </footer>
    )
})

export default Footer