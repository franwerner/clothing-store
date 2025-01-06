import { UseFetch } from "@/hooks/useFetch";
import { Button } from "@nextui-org/react";
import classNames from "classnames";

interface ProductFullViewButtonShopcartProps {
    isDisabled: boolean,
    isLoading: boolean,
    addProductToCart: (props?: UseFetch.Props) => void
}

const ProductFullViewButtonShopcart = ({
    isDisabled,
    isLoading,
    addProductToCart,
}: ProductFullViewButtonShopcartProps) => {

    return (
        <section>
            <Button
                color="success"
                isLoading={isLoading}
                variant={"solid"}
                onPress={() => {
                    addProductToCart()
                }}
                isDisabled={isDisabled}
                className={classNames(
                    "w-full h-16 bg-white text-lg font-medium rounded-sm border border-black uppercase",
                    {
                        "data-[disabled=true]:border-default-300 ": isDisabled,
                    }
                )}
            >
                <div className="flex gap-1 items-center">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                    Agregar al carrito
                </div>
            </Button>
        </section>
    );
};

export default ProductFullViewButtonShopcart