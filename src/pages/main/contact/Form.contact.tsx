import ActionButton from "@/components/ActionButton";
import BaseInput from "@/components/BaseInput";
import useForm from "@/hooks/useForm.hook";
import { Textarea } from "@nextui-org/react";




const ContactForm = () => {

    const { form, onChange } = useForm({ name: "", mail: "", phone: "", message: "" })

    return (
        <form
            className="inline-flex  gap-3  flex-wrap "
            id="contact-form">
            <BaseInput
                isRequired
                placeholder="Ingresa tu nombre y apellido."
                onChange={onChange}
                label={"Nombre"}
                name={"name"}
                value={form.name} />
            <BaseInput
                isRequired
                placeholder="Email de contacto."
                onChange={onChange}
                label={"Email"}
                name={"mail"}
                value={form.mail} />
            <BaseInput
                placeholder="Telefono de contacto."
                onChange={onChange}
                label={"Teléfono"}
                name={"phone"}
                isRequired={false}
                value={form.phone} />
            <Textarea
                color="default"
                label="Deja un mensaje"
                labelPlacement="outside"
                maxLength={256}
                minLength={20}
                classNames={{
                    label: "uppercase font-semibold  text-default-600",
                    inputWrapper: "border-3 data-[hover=true]:bg-default-100 group-data-[focus=true]:border-secondary-300 hover:border-secondary-100"
                }}
                placeholder="Comentanos tu duda."
                onChange={onChange}
                name={"message"}
                value={form.message}
            />
            <ActionButton>
                Enviar consulta
            </ActionButton>
        </form>
    );
};



export default ContactForm