import ActionButtonIcon from "@/components/ActionButtonIcon";
import { Input } from "@nextui-org/react";

const ProductsFilterPrice = () => {
    return (
        <section
            id="aside-filter-price" >
            <h3 className="font-oswald  text-default-700  uppercase pb-1 font-bold text-[18px]">Precio</h3>
            <div className="flex items-center mt-1 gap-2 ">
                <Input
                    label="Min"
                    classNames={{
                        inputWrapper: "h-2",
                        label: " text-[13px]"
                    }}
                    color="default"
                    variant="flat"
                >
                </Input>
                <Input
                    label="Max"
                    classNames={{
                        inputWrapper: " h-2 flex",
                        label: "text-[13px]"
                    }}
                    color="default"
                    variant="flat"
                >
                </Input>
                <ActionButtonIcon>
                    chevron_right
                </ActionButtonIcon>
            </div>
        </section>
    );
};

export default ProductsFilterPrice