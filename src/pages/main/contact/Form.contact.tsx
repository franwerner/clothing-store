import ActionButton from "@/components/ActionButton";
import FormBase from "@/containers/form-base";
import InputBase from "@/containers/form-base/InputBase";
import { Textarea } from "@nextui-org/react";
import useContactForm from "./hook/useContactForm.hook";
import usePostUserQuestionsGuest from "@/pages/main/contact/api/usePostUserQuestionsGuest.api";

const ContactForm = () => {
    const { form, onChange, errors, checkFormErrors, resetForm } = useContactForm()
    const { isLoading, setRequest } = usePostUserQuestionsGuest(form, resetForm)

    const { hasError, list } = errors
    return (
        <FormBase
            errors={list}
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
                label={"Apellido"}
                name={"lastname"}
                value={form.lastname} />
            <InputBase
                isRequired
                onChange={onChange}
                label={"Email"}
                name={"email"}
                value={form.email} />
            <InputBase
                onChange={onChange}
                label={"Teléfono"}
                name={"phone"}
                isRequired={false}
                value={form.phone || ""} />
            <Textarea
                color="default"
                label="Deja un mensaje"
                labelPlacement="outside"
                variant="bordered"
                radius="sm"
                isInvalid={!!list.message}
                errorMessage={list.message}
                classNames={{
                    label: "uppercase font-semibold  text-default-600",
                    inputWrapper: "border-1 border-default-400 group-data-[focus=true]:border-secondary-400 data-[hover=true]:border-secondary-200 "
                }}
                placeholder="Comentanos tu duda."
                onChange={onChange}
                name={"message"}
                value={form.message || ""}
            />
            <ActionButton
                onPress={() => {
                    const { hasError, setErrors } = checkFormErrors()
                    if (hasError) return setErrors()
                    setRequest()
                }}
                isDisabled={hasError}
                isLoading={isLoading}
            >
                Enviar consulta
            </ActionButton>
        </FormBase>
    )
}

export default ContactForm