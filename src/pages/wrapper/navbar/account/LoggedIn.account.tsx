import useLogout from "@/hooks/api/useLogout.api"
import { useSelector } from "@/store"
import { Button, DropdownItem, DropdownMenu } from "@nextui-org/react"


const AccountLoggedIn = () => {

    const [{ isLoading }, { setRequest }] = useLogout()
    const fullname = useSelector((store) => store.user.info?.fullname)
    return (
        <DropdownMenu
            itemClasses={{ base: "data-[hover=true]:bg-default-200  uppercase" }}
            color="default">
            <DropdownItem
                key={"fullname"}
            >
                {fullname}
            </DropdownItem>
            <DropdownItem
                showDivider
                title="Mis compras"
                key={"purchases"}
            />
            <DropdownItem
                key={"logout"}
                closeOnSelect = {false}
                onClick={() => {
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