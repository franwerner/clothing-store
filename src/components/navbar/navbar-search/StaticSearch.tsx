import { Input, NavbarItem } from "@nextui-org/react";

const StaticSearch = () => {
    return (
        <NavbarItem className=" hidden md:flex">
            <Input
                isClearable
                radius="lg"
                color="secondary"
                classNames={{
                    inputWrapper: [
                        "shadow",
                    ],
                }}
                
                placeholder="Buscar producto..."
                startContent={
                    <span className="material-symbols-outlined ">
                        search
                    </span>}
            >
            </Input>
        </NavbarItem>
    );
};

export default StaticSearch;