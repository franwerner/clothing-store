import { ChangeEventHandler, createContext, ReactNode, useContext } from "react";
import useDirectionForm, { DirectionForm } from "../hook/useDirectionForm.hook";
import { useSelector } from "@/store";
import { CheckFormErrors, FormValidationErrors, SetValidationForm } from "my-hooks";

const PaymentContext = createContext<{
    isGuest: boolean
    errors: {
        hasError:boolean,
        list : FormValidationErrors<DirectionForm>
    }
    form: DirectionForm
    onChange: ChangeEventHandler<HTMLInputElement>
    setForm: SetValidationForm<DirectionForm>
    checkFormErrors: CheckFormErrors<DirectionForm>
}>({} as any)


const usePaymentContext = () => useContext(PaymentContext)

const PaymentProvider = ({ children }: { children: ReactNode }) => {
    
    const { user_id } = useSelector(({ user }) => user.info) || {}
    const isGuest = !user_id
    const { form, errors, onChange, setForm, checkFormErrors } = useDirectionForm(isGuest)
    

    return (
        <PaymentContext.Provider value={{
            isGuest,
            errors,
            onChange,
            setForm,
            checkFormErrors,
            form
        }}>
            {children}
        </PaymentContext.Provider>
    );
};

export {
    usePaymentContext
}
export default PaymentProvider