import useFormValidation, { HandlerValidatorForm } from "@/hooks/useValidationFom.hook"
import zodPickMessage from "@/utils/zodPickMessage.utilts"
import { userSchema } from "clothing-store-shared/schema"

interface PasswordResetFormProps {
    password:string
    confirm_password:string
}

const passwordSchema = userSchema.base.shape.password

const usePasswordResetForm = () => {

    const initialValue:PasswordResetFormProps = {
        password : "",
        confirm_password : ""
    }
const validator:HandlerValidatorForm<PasswordResetFormProps> = ({currentState,fieldName,value}) => {
    if (fieldName === "password") {
        return zodPickMessage(passwordSchema.safeParse(value).error)
    }else if(fieldName === "confirm_password"){
        if(currentState.password.value !== value){
          return "Las contraseñas son diferentes"
        }
    }
}    
    return useFormValidation(initialValue,validator)

}

export default usePasswordResetForm