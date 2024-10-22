import FooterMain from "./Main.footer"
import FooterTop from "./Top.footer"


const Footer = () => {
    return (
        <footer
        className="min-h-[300px] flex justify-center items-center flex-col  mt-10 w-full  ">
                <FooterTop />
                <FooterMain/>
        </footer>
    )
}

export default Footer