import router from "@/router"
import { useSelector } from "@/store"
import { Button, DropdownItem, DropdownMenu } from "@nextui-org/react"
import useLogout from "./api/useLogout.api"


const AccountLoggedIn = () => {

    const { isLoading, setRequest } = useLogout()
    const fullname = useSelector((store) => {
        const { lastname, name } = store.user.info || {}
        return name + " " + lastname
    })
    return (
        <DropdownMenu
            itemClasses={{ base: "data-[hover=true]:bg-default-200  uppercase" }}
            color="default">
            <DropdownItem
                onPress={() => {
                    router.navigate("/cuenta")
                }}
                key={"fullname"}
            >
                {fullname}
            </DropdownItem>
            <DropdownItem
                onPress={() => {
                    router.navigate("/cuenta/mis-compras")
                }}
                showDivider
                title="Mis compras"
                key={"purchases"}
            />
            <DropdownItem
                key={"logout"}
                closeOnSelect={false}
                onPress={() => {
                    setRequest()
                }}
                classNames={{
                    wrapper: "font-bold",
                }}
                title="Salir"
                className=" data-[hover=true]:text-white data-[hover=true]:opacity-85  group [&_span]:font-semibold text-dark data-[hover=true]:bg-black"
                endContent={
                    <Button
                        isLoading={isLoading}
                        isIconOnly
                        className="material-symbols-outlined pointer-events-none bg-transparent group-hover:text-white text-2xl w-6 h-6 ">
                        logout
                    </Button>
                }
            />
        </DropdownMenu>

    )
}





export default AccountLoggedIn