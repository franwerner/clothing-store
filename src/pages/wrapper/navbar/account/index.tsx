import router from "@/router";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { memo, useState } from "react";

const NavbarAccount = memo(() => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dropdown
            shadow="lg"
            shouldCloseOnInteractOutside={() => true}
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            classNames={{
                trigger: "aria-expanded:opacity-100",
                base: "hidden sm:flex",
            }}
        >
            <DropdownTrigger
                className="uppercase ">
                <div className=" cursor-pointer items-center hidden sm:flex">
                    <span className=" text-[16px]  font-medium">Cuenta</span>
                    <span className={`material-symbols-outlined  transition-transform duration-300 text-[30px] ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                        arrow_drop_down
                    </span>
                </div>
            </DropdownTrigger>
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
        </Dropdown>
    );
})

export default NavbarAccount


