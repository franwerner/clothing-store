import useLogout from "@/hooks/api/useLogout.api"
import { useSelector } from "@/store"
import { Button, DropdownItem, DropdownMenu } from "@nextui-org/react"


const AccountLoggedIn = () => {

    const { fullname, user_id } = useSelector((store) => store.user.info) || {}

    const [{isLoading},{setRequest}] = useLogout(user_id)

    return (
        <DropdownMenu
            itemClasses={{ base: "data-[hover=true]:bg-default-200  uppercase" }}
            color="default">
            <DropdownItem>
                {fullname}
            </DropdownItem>
            <DropdownItem
                showDivider
            >
                Mis compras
            </DropdownItem>
            <DropdownItem
                onClick={() => setRequest()}
                classNames={{
                    wrapper: "font-bold",
                }}
                title="Salir"
                className=" data-[hover=true]:text-white data-[hover=true]:opacity-85  group [&_span]:font-semibold text-dark data-[hover=true]:bg-black"
                endContent={
                    <Button
                        isLoading={isLoading}
                        isIconOnly
                        className="material-symbols-outlined bg-transparent group-hover:text-white text-2xl w-6 h-6 ">
                        logout
                    </Button>
                }
            />
        </DropdownMenu>

    )
}


export default AccountLoggedIn