import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import router from "@/router"
import { motion } from "framer-motion"
import AccountAnimationVariant from "../constant/animationVariant.contant"
import FormRegister from "./Form.register"
import usePostRegister from "./api/usePostRegister.api"
import useRegisterForm from "./hook/useRegisterForm.hook"

const AccountRegister = () => {

    const { form, onChange, errors } = useRegisterForm()

    const {
        email,
        fullname,
        password,
        phone
    } = form

    const { isLoading, setRequest } = usePostRegister({
        email,
        fullname,
        password,
        phone,
    })

    const onRegister = () => {
        if (errors.hasError) return
        setRequest()
    }

return (
    <>
        <AnimatedTitle title="Crea tu cuenta" />
        <motion.section
            initial={"hidden"}
            variants={AccountAnimationVariant}
            animate={"show"}
            transition={{
                duration: 0.2,
            }}
            className=" w-full items-start flex flex-col gap-6  justify-center"
        >

            <FormRegister
                form={form}
                errors={errors.list}
                onKeyUp={(e) => {
                    if (e.key == "Enter") {
                        onRegister()
                    }
                }}
                onChange={onChange}
            />
            <p className="w-full text-center">
                ¿Ya tienes una cuenta?
                <a
                    className="inline-block ml-1 font-semibold underline cursor-pointer  hover:opacity-80"
                    onClick={() => router.navigate("/cuenta/ingresar")}>
                    Inicia sesión
                </a>
            </p>

            <ActionButton
                onPress={() => {
                    onRegister()
                }}
                isLoading={isLoading}
                className="min-w-[300px] sm:w-auto ">
                Registrarse
            </ActionButton>
        </motion.section>
    </>
)
}

export default AccountRegister

