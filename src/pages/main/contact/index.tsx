import AnimatedTitle from "@/components/AnimatedTitle";
import PageWrapper from "@/components/PageWrapper";
import ContactForm from "./Form.contact";
import ContactHeader from "./Header.contact";
import ContactPin from "./Pin.contact";

const ContactPage = () => {
    return (
        <PageWrapper>
            <AnimatedTitle title="Contacto" className="max-sm:pt-1"  />
            <ContactHeader />
            <main className="grid md:grid-cols-2 items-start gap-10  justify-center  pt-10">
                <ContactPin />
                <ContactForm />
            </main>
        </PageWrapper>
    )
}

export default ContactPage