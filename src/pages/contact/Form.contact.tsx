import ActionButton from "@/components/ActionButton";
import useForm from "@/hooks/useForm.hook";
import { Input, InputProps, Textarea } from "@nextui-org/react";
import { memo } from "react";



const InputContact = memo((props: InputProps) => (
    <Input
        classNames={{
            label: "uppercase font-semibold  text-default-600",
            "inputWrapper": "after:bg-secondary-300",
            base: "min-w-auto"
        }}
        errorMessage="puto"
        type={"text"}
        labelPlacement="outside"
        variant="underlined"
        color="secondary"
        {...props}
    >
    </Input>
))

const ContactForm = () => {

    const { form, onChange } = useForm({ name: "", mail: "", phone: "", message: "" })

    return (
        <div
            className="inline-flex  gap-3  flex-wrap "
            id="contact-form">
            <InputContact
                isRequired
                placeholder="Ingresa tu nombre y apellido."
                onChange={onChange}
                label={"Nombre"}
                name={"name"}
                value={form.name} />
            <InputContact
                isRequired
                placeholder="Email de contacto."
                onChange={onChange}
                label={"Email"}
                name={"mail"}
                value={form.mail} />
            <InputContact
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
                placeholder="Comentamos tu duda."
                onChange={onChange}
                name={"message"}
                value={form.message}
            />
            <ActionButton>
                Enviar consulta
            </ActionButton>
        </div>
    );
};



export default ContactForm