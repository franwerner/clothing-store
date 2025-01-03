import { Button } from "@nextui-org/react"
import classNames from "classnames";

interface ProductFullViewButtonShopcartProps {
    button?: boolean
    isDisabled: boolean,
    isLoading: boolean,
    addProductToCart: () => void
}

const ProductFullViewButtonShopcart = ({
    button = false,
    isDisabled,
    isLoading,
    addProductToCart,
}: ProductFullViewButtonShopcartProps) => {


    return (
        <section>
            <Button
                color="success"
                isLoading={isLoading}
                variant={button ? "bordered" : "solid"}
                onPress={() => addProductToCart()}
                isDisabled={isDisabled}
                className={classNames(
                    "w-full h-16 bg-white text-lg font-medium rounded-sm border uppercase",
                    {
                        "data-[disabled=true]:border-default-300": isDisabled,
                        "border-black": !button,
                    }
                )}
            >
                {!button ? (
                    <div className="flex gap-1 items-center">
                        <span className="material-symbols-outlined">add_shopping_cart</span>
                        Agregar al carrito
                    </div>
                ) : (
                    <div className="flex gap-1 items-center text-success-400">
                        <span className="material-symbols-outlined scale-110 transition-transform duration-500">
                            check_circle
                        </span>
                        Producto agregado
                    </div>
                )}
            </Button>
        </section>
    );
};

export default ProductFullViewButtonShopcart