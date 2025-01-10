import router from "@/router"
import { DropdownItem, DropdownMenu } from "@nextui-org/react"

const AccountLoggedOut = () => {
    return (
        <DropdownMenu
            itemClasses={{ base: "data-[hover=true]:bg-default-200  uppercase" }}
            color="default"  >
            <DropdownItem
                onPress={() => router.navigate("/cuenta/ingresar")}
                showDivider
                key="login" >
                Iniciar sesión
            </DropdownItem>
            <DropdownItem
                onPress={() => router.navigate("/cuenta/registrarse")}
                key="register">
                Crear cuenta
            </DropdownItem>
        </DropdownMenu>
    )
}


export default AccountLoggedOut 