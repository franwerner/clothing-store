import { Input, NavbarItem } from "@nextui-org/react";
import { ChangeEventHandler } from "react";

interface ProductSearchStaticProps {
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>
}

const ProductSearchStatic = ({ onChange, value }: ProductSearchStaticProps) => {
    return (
        <NavbarItem className=" hidden md:flex">
            <Input
                isClearable
                radius="lg"
                autoComplete={"off"}
                name="search"
                color="secondary"
                classNames={{
                    inputWrapper: [
                        "shadow",
                    ],
                }}
                onChange={onChange}
                value={value}
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

export type { ProductSearchStaticProps }
export default ProductSearchStatic;