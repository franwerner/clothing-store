import { useSelector } from "@/store";
import { Dropdown, DropdownTrigger } from "@nextui-org/react";
import { memo, useState } from "react";
import AccountLoggedIn from "./LoggedIn.account";
import AccountLoggedOut from "./LoggedOut.account";


const NavbarAccount = memo(() => {
    const [isOpen, setIsOpen] = useState(false);

    const select = useSelector((store) => store.user.info)
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
            {
                select?.user_id ?
                    <AccountLoggedIn /> :
                    <AccountLoggedOut />
            }
        </Dropdown>
    );
})

export default NavbarAccount


