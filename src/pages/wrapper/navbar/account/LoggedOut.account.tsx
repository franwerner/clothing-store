import router from "@/router"
import { DropdownItem, DropdownMenu } from "@nextui-org/react"

const AccountLoggedOut = () => {
    return (
        <DropdownMenu
            itemClasses={{ base: "data-[hover=true]:bg-default-200  uppercase" }}
            color="default"  >
            <DropdownItem
                onClick={() => router.navigate("/cuenta?form=login")}
                showDivider
                key="login" >
                Iniciar sesión
            </DropdownItem>
            <DropdownItem
                onClick={() => router.navigate("/cuenta?form=register")}
                key="register">
                Crear cuenta
            </DropdownItem>
        </DropdownMenu>
    )
}


export default AccountLoggedOut 