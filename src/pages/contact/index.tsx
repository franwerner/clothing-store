import AnimatedTitle from "@/components/AnimatedTitle";
import PageWrapper from "@/components/PageWrapper";
import { ScrollRestoration } from "react-router-dom";
import ContactForm from "./Form.contact";
import ContactHeader from "./Header.contact";
import ContactPin from "./Pin.contact";

const ContactPage = () => {
    return (
        <PageWrapper>
            <AnimatedTitle title="Contacto" />
            <ContactHeader />
            <main className="grid md:grid-cols-2 items-start gap-10  justify-center  pt-10">
                <ContactPin />
                <ContactForm />
            </main>
            <ScrollRestoration />
        </PageWrapper>
    )
}

export default ContactPage