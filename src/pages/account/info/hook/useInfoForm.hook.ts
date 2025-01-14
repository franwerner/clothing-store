import zodPickMessage from "@/utils/zodPickMessage.utilts"
import { userSchema } from "clothing-store-shared/schema"
import { HandlerValidatorForm, useFormValidation } from "my-hooks"

export interface InfoFormProps {
    fullname: string,
    phone: string,
    password: string
}

const shape = userSchema.update.shape

const initalValues: InfoFormProps = {
    fullname: "",
    phone: "",
    password: "",
}

const useInfoForm = (props: InfoFormProps = initalValues) => {

    const validator: HandlerValidatorForm<InfoFormProps> = ({ fieldName, value }) => {
        if (fieldName in shape && value) {
            return zodPickMessage(shape[fieldName as keyof typeof shape].safeParse(value).error)
        }
    }

    return useFormValidation<InfoFormProps>(props, validator)

}
export default useInfoForm