import ActionButton from "@/components/ActionButton";
import InputBase from "@/containers/form-base/InputBase";
import useForm from "@/hooks/useForm.hook";
import { Textarea } from "@nextui-org/react";

const ContactForm = () => {
    const { form, onChange } = useForm({ name: "", mail: "", phone: "", message: "" })
    return (
        <form
            className="inline-flex  gap-3  flex-wrap "
            id="contact-form">
            <InputBase
                isRequired
                onChange={onChange}
                label={"Nombre"}
                name={"name"}
                value={form.name} />
            <InputBase
                isRequired
                onChange={onChange}
                label={"Email"}
                name={"mail"}
                value={form.mail} />
            <InputBase
                onChange={onChange}
                label={"Teléfono"}
                name={"phone"}
                isRequired={false}
                value={form.phone} />
            <Textarea
                color="default"
                label="Deja un mensaje"
                labelPlacement="outside"
                variant="bordered"
                radius="sm"
                maxLength={256}
                minLength={0}
                classNames={{
                    label: "uppercase font-semibold  text-default-600",
                    inputWrapper: "border-1 border-default-400 group-data-[focus=true]:border-secondary-400 data-[hover=true]:border-secondary-200 "
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
    )
}

export default ContactForm